#!/usr/bin/env node
import { execSync, spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const endpoint = "http://127.0.0.1:7242/ingest/8734fa2f-68f7-4c04-a667-f7efae3d4ce6";
const sessionId = "debug-session";
const runId = "git-push-run";
const logPath = path.join(process.cwd(), ".cursor", "debug.log");

const logPromises = [];

function log(hypothesisId, location, message, data) {
    // #region agent log
    const payload = {
        sessionId,
        runId,
        hypothesisId,
        location,
        message,
        data,
        timestamp: Date.now(),
    };

    const p = fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    }).catch(() => {});

    try {
        fs.appendFileSync(logPath, JSON.stringify(payload) + "\n");
    } catch {
        // ignore fs errors to avoid masking git push info
    }

    logPromises.push(p);
    // #endregion
}

function safeExec(command) {
    try {
        return execSync(command, { encoding: "utf8" });
    } catch (error) {
        return error.stdout || error.stderr || String(error);
    }
}

async function main() {
    // H2/H3: capture current status and branch info
    const status = safeExec("git status -sb");
    log("H2", "git-push-debug.js:status", "git status", { status });

    const branch = safeExec("git branch --show-current");
    log("H2", "git-push-debug.js:branch", "current branch", { branch: branch.trim() });

    const remotes = safeExec("git remote -v");
    log("H3", "git-push-debug.js:remotes", "git remotes", { remotes });

    // H1/H4: attempt push without interactive prompt to capture auth/rejection quickly
    const pushResult = spawnSync("git", ["push", "origin", "main"], {
        encoding: "utf8",
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
    });

    log("H1", "git-push-debug.js:push", "git push result", {
        status: pushResult.status,
        stdout: pushResult.stdout,
        stderr: pushResult.stderr,
        signal: pushResult.signal,
    });

    await Promise.allSettled(logPromises);
}

main();
