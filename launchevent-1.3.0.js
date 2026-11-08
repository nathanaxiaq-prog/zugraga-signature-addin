(() => {
  // src/generated/signature.html
  var signature_default = `<span style="display:none;font-size:0;color:transparent;mso-hide:all">ZSIG01</span>
<table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;width:600px"><tr><td style="padding:16px 0 14px">
<table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse"><tr>
<td valign="bottom" style="font-family:'Segoe UI',Arial,sans-serif"><div style="font-family:'Segoe UI',Arial,sans-serif;font-size:26px;line-height:30px;font-weight:700;color:#4a2463">Żugraga Operations</div></td>
<td valign="bottom" align="right" style="padding:0 0 2px"><a href="https://www.facebook.com/zugraga.mt/"><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-facebook.png" width="26" height="26" alt="Facebook" style="display:inline-block;border:0"></a>&nbsp;&nbsp;<a href="https://www.instagram.com/zugraga.mt/"><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-instagram.png" width="26" height="26" alt="Instagram" style="display:inline-block;border:0"></a></td></tr>
<tr><td colspan="2" style="padding:12px 0 0"><table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse;border-top:2px solid #f2b51b;font-family:'Segoe UI',Arial,sans-serif;font-size:13px;line-height:18px;color:#4a2463"><tr>
<td width="27" style="padding:12px 0 6px"><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-phone.png" width="18" height="18" alt="" style="display:block;border:0"></td><td width="213" style="padding:12px 0 6px;font-family:'Segoe UI',Arial,sans-serif;font-size:13px"><a href="tel:+35625683807" style="color:#4a2463;text-decoration:none">+356 2568 3807</a></td>
<td width="27" style="padding:12px 0 6px"><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-web.png" width="18" height="18" alt="" style="display:block;border:0"></td><td style="padding:12px 0 6px;font-family:'Segoe UI',Arial,sans-serif;font-size:13px"><a href="https://zugraga.mt/" style="color:#4a2463;text-decoration:none;font-weight:600">zugraga.mt</a></td></tr><tr>
<td><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-mail.png" width="18" height="18" alt="" style="display:block;border:0"></td><td style="font-family:'Segoe UI',Arial,sans-serif;font-size:13px"><a href="mailto:operations@zugraga.mt" style="color:#4a2463;text-decoration:none">operations@zugraga.mt</a></td>
<td><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-pin.png" width="18" height="18" alt="" style="display:block;border:0"></td><td style="font-family:'Segoe UI',Arial,sans-serif;font-size:12px;color:#6f6577;white-space:nowrap"><a href="https://www.google.com/maps/search/?api=1&amp;query=Zugraga+Mqabba&amp;query_place_id=ChIJ_bv-RdxRDhMR_eLJuPS3h00" style="color:#6f6577;text-decoration:none">154 Triq Il-Parroċċa, L-Imqabba, Malta</a></td></tr></table></td></tr></table></td></tr>
<tr><td><a href="https://zugraga.mt/"><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-banner.jpg" width="600" height="170" alt="&#379;ugraga - Trusted Childcare Across Malta" style="display:block;border:0;border-radius:14px"></a></td></tr>
<tr><td style="padding:10px 0 0"><table cellpadding="0" cellspacing="0" border="0" width="600" style="border-collapse:collapse"><tr>
<td style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;line-height:14px;color:#8d8496;padding:0 16px 0 2px">This email and any attachments are confidential and may be privileged. If you are not the intended recipient, please notify the sender and delete it.</td>
<td style="font-family:'Segoe UI',Arial,sans-serif;font-size:10px;color:#8d8496;white-space:nowrap;padding:0 6px 0 0">Part of</td>
<td style="padding:0 12px 0 0"><a href="https://www.uniplural.com/"><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-uniplural.png" width="70" height="24" alt="Uniplural Group" style="display:block;border:0"></a></td>
<td width="24"><img src="https://zugraga.mt/wp-content/uploads/2026/11/zugraga-sig-ncpe.png" width="24" height="32" alt="NCPE Equality Certified" style="display:block;border:0"></td></tr></table></td></tr></table>`;

  // src/runtime/diagnostic.js
  var DIAGNOSTIC_TAG = "1.3.0";
  var DIAGNOSTIC_KEY = "zugragaOpsDiag";
  function formatDiagnostic(fields) {
    const fromClass = fields.fromClass === "operations" ? "ops" : fields.fromClass === "other" ? "other" : "unread";
    const parts = [
      DIAGNOSTIC_TAG,
      fields.entry || "?",
      `boot:${fields.boot === "ready" ? "ready" : "eval"}`,
      `from:${fromClass}`
    ];
    if (fromClass === "unread") {
      const profile = fields.profileClass === "ops" ? "ops" : fields.profileClass === "other" ? "other" : "none";
      parts.push(`profile:${profile}`);
    }
    parts.push(`api:${fields.api === "yes" ? "yes" : "no"}`);
    parts.push(`sig:${allowedSig(fields.sig)}`);
    if (fields.detail) parts.push(safeToken(fields.detail));
    const message = parts.join(" ").slice(0, 150);
    if (/[@]|subject|recipient|\bbody\b/i.test(message)) {
      throw new Error("Diagnostic text is not safe to show.");
    }
    return message;
  }
  function postItemNotice(item, message, schedule, cancel) {
    return new Promise((resolve) => {
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      let timer = null;
      if (typeof schedule === "function") timer = schedule(() => finish(false), 400);
      try {
        const notices = item && item.notificationMessages;
        if (!notices || typeof notices.addAsync !== "function") {
          if (timer != null && typeof cancel === "function") cancel(timer);
          finish(false);
          return;
        }
        notices.addAsync(
          DIAGNOSTIC_KEY,
          { type: "informationalMessage", message, icon: "none", persistent: true },
          () => {
            if (timer != null && typeof cancel === "function") cancel(timer);
            finish(true);
          }
        );
      } catch {
        finish(false);
      }
    });
  }
  function allowedSig(value) {
    if (value === "ok" || value === "fail" || value === "skip" || value === "timeout" || value === "wait") return value;
    return "skip";
  }
  function safeToken(value) {
    return String(value).replace(/[^A-Za-z0-9_-]/g, "").slice(0, 32);
  }

  // src/runtime/policy.js
  var OPERATIONS_ADDRESS = "operations@zugraga.mt";
  var INSERT_COMPOSE_TYPES = /* @__PURE__ */ new Set(["newmail", "reply", "replyall", "reply-all", "forward"]);
  function normalizeEmail(value) {
    if (typeof value !== "string") return "";
    let text = value.trim().toLowerCase();
    const wrapped = text.match(/^.*<([^<>\s]+)>\s*$/);
    if (wrapped) text = wrapped[1].trim().toLowerCase();
    if (text.startsWith("mailto:")) text = text.slice("mailto:".length).trim();
    return text;
  }
  function isOperationsSender(value) {
    return normalizeEmail(value) === OPERATIONS_ADDRESS;
  }
  function decideSignatureAction({
    senderKnown,
    senderIsOperations,
    mailboxIsOperations = false,
    composeType,
    coercionType,
    signatureApiAvailable,
    reason
  }) {
    if (!signatureApiAvailable) {
      return { action: "skip", cause: "signature-api-missing" };
    }
    if (typeof coercionType === "string" && coercionType.trim().toLowerCase() === "text") {
      return { action: "skip", cause: "plain-text" };
    }
    if (typeof composeType === "string" && composeType.trim() !== "") {
      const normalized = composeType.trim().toLowerCase();
      if (!INSERT_COMPOSE_TYPES.has(normalized)) {
        return { action: "skip", cause: "unsupported-compose-type" };
      }
    }
    if (!senderKnown) {
      if (reason === "compose" && mailboxIsOperations) {
        return { action: "insert", cause: "mailbox-profile" };
      }
      return { action: "skip", cause: "sender-unknown" };
    }
    if (senderIsOperations) {
      return { action: "insert", cause: "operations-sender" };
    }
    return { action: "skip", cause: "sender-out-of-scope" };
  }

  // src/runtime/handle-event.js
  var DEFAULT_TIMEOUT_MS = 4e3;
  var DEFAULT_SENDER_TIMEOUT_MS = 1500;
  var MAX_SIGNATURE_CHARS = 3e4;
  function officeSucceeded(result) {
    return Boolean(result) && (result.status === "succeeded" || result.status === "Succeeded");
  }
  function createGate(event, deps, onFinish) {
    let settled = false;
    const timeoutMs = Number.isFinite(deps.timeoutMs) ? deps.timeoutMs : DEFAULT_TIMEOUT_MS;
    const schedule = deps.schedule;
    const cancel = deps.cancel;
    const gate = {
      cancelled: false,
      outcome: null,
      timer: null,
      finish(outcome) {
        if (settled) return false;
        settled = true;
        gate.cancelled = true;
        gate.outcome = outcome;
        if (gate.timer != null && typeof cancel === "function") {
          try {
            cancel(gate.timer);
          } catch {
          }
        }
        try {
          if (event && typeof event.completed === "function") event.completed();
        } catch {
        }
        onFinish(outcome);
        return true;
      }
    };
    if (typeof schedule !== "function") {
      throw new Error("Event handler requires a scheduler.");
    }
    gate.timer = schedule(() => {
      const run = () => gate.finish({ status: "completed", cause: "timeout" });
      if (typeof deps.onTimeout !== "function") {
        run();
        return;
      }
      Promise.resolve().then(() => deps.onTimeout()).then(run, run);
    }, timeoutMs);
    return gate;
  }
  function readCompose(item) {
    if (!item || typeof item.getComposeTypeAsync !== "function") {
      return Promise.resolve({ composeType: void 0, coercionType: void 0 });
    }
    return new Promise((resolve) => {
      try {
        item.getComposeTypeAsync((result) => {
          if (!officeSucceeded(result) || !result.value) {
            resolve({ composeType: void 0, coercionType: void 0 });
            return;
          }
          resolve({
            composeType: result.value.composeType,
            coercionType: result.value.coercionType
          });
        });
      } catch {
        resolve({ composeType: void 0, coercionType: void 0 });
      }
    });
  }
  function readSender(item, deps) {
    if (!item || !item.from || typeof item.from.getAsync !== "function") {
      return Promise.resolve({ known: false, isOperations: false });
    }
    return new Promise((resolve) => {
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        resolve(value);
      };
      let timer = null;
      const timeoutMs = Number.isFinite(deps.senderTimeoutMs) ? deps.senderTimeoutMs : DEFAULT_SENDER_TIMEOUT_MS;
      if (typeof deps.schedule === "function") {
        timer = deps.schedule(() => finish({ known: false, isOperations: false, cause: "sender-timeout" }), timeoutMs);
      }
      try {
        item.from.getAsync((result) => {
          if (timer != null && typeof deps.cancel === "function") {
            try {
              deps.cancel(timer);
            } catch {
            }
          }
          if (!officeSucceeded(result) || !result.value || typeof result.value.emailAddress !== "string") {
            finish({ known: false, isOperations: false });
            return;
          }
          const email = result.value.emailAddress;
          if (typeof email !== "string" || email.trim() === "") {
            finish({ known: false, isOperations: false });
            return;
          }
          finish({ known: true, isOperations: isOperationsSender(email) });
        });
      } catch {
        finish({ known: false, isOperations: false });
      }
    });
  }
  function setSignature(item, html) {
    return new Promise((resolve) => {
      try {
        item.body.setSignatureAsync(html, { coercionType: "html" }, (result) => {
          resolve(officeSucceeded(result));
        });
      } catch {
        resolve(false);
      }
    });
  }
  function signatureIsUsable(html) {
    return typeof html === "string" && html.length > 0 && html.length <= MAX_SIGNATURE_CHARS && !html.includes("%%");
  }
  function fromFields(sender, mailboxIsOperations) {
    if (sender && sender.known && sender.isOperations) return { fromClass: "operations" };
    if (sender && sender.known) return { fromClass: "other" };
    return { fromClass: "unread", profileClass: mailboxIsOperations ? "ops" : "none" };
  }
  function report(item, deps, entry, fields) {
    let message = "1.3.0 ? boot:eval from:unread profile:none api:no sig:skip";
    try {
      message = formatDiagnostic({
        tag: "1.3.0",
        entry,
        boot: typeof deps.getBoot === "function" ? deps.getBoot() : "eval",
        ...fields
      });
    } catch {
      message = "1.3.0 ? boot:eval from:unread profile:none api:no sig:fail detail";
    }
    const notify = typeof deps.notify === "function" ? deps.notify : (target, text) => postItemNotice(target, text, deps.schedule, deps.cancel);
    return Promise.resolve().then(() => notify(item, message)).catch(() => false);
  }
  function handleSignatureEvent(event, deps, reason, entry = reason) {
    return new Promise((resolve) => {
      let gate;
      try {
        gate = createGate(event, deps, resolve);
      } catch {
        try {
          if (event && typeof event.completed === "function") event.completed();
        } catch {
        }
        resolve({ status: "completed", cause: "exception" });
        return;
      }
      let item = null;
      try {
        item = deps.getItem();
      } catch {
        gate.finish({ status: "completed", cause: "exception" });
        return;
      }
      const finishReported = (fields, outcome) => report(item, deps, entry, fields).then(() => {
        gate.finish(outcome);
      });
      deps.onTimeout = () => report(item, deps, entry, {
        fromClass: "unread",
        profileClass: "none",
        api: signatureApiAvailable ? "yes" : "no",
        sig: "timeout",
        detail: "timeout"
      });
      const signatureApiAvailable = Boolean(item && item.body && typeof item.body.setSignatureAsync === "function");
      if (!signatureApiAvailable) {
        finishReported({ fromClass: "unread", profileClass: "none", api: "no", sig: "skip", detail: "no-api" }, { status: "skipped", cause: "signature-api-missing" });
        return;
      }
      if (reason !== "compose" && reason !== "fromChanged") {
        finishReported({ fromClass: "unread", profileClass: "none", api: "yes", sig: "skip", detail: "bad-event" }, { status: "skipped", cause: "unsupported-event" });
        return;
      }
      const mailboxIsOperations = isOperationsSender(typeof deps.getMailboxAddress === "function" ? deps.getMailboxAddress() : "");
      Promise.all([readCompose(item), readSender(item, deps)]).then(([compose, sender]) => {
        if (gate.cancelled) return null;
        const decision = decideSignatureAction({
          senderKnown: sender.known,
          senderIsOperations: sender.isOperations,
          mailboxIsOperations,
          composeType: compose.composeType,
          coercionType: compose.coercionType,
          signatureApiAvailable: true,
          reason
        });
        const who = fromFields(sender, mailboxIsOperations);
        if (decision.action === "skip") {
          return finishReported({ ...who, api: "yes", sig: "skip", detail: decision.cause }, { status: "skipped", cause: decision.cause });
        }
        if (decision.action === "insert") {
          if (!signatureIsUsable(deps.signatureHtml)) {
            return finishReported({ ...who, api: "yes", sig: "fail", detail: "bad-html" }, { status: "failed", cause: "signature-invalid" });
          }
          return setSignature(item, deps.signatureHtml).then((ok) => {
            if (gate.cancelled) return null;
            if (!ok) {
              return finishReported({ ...who, api: "yes", sig: "fail", detail: "set-failed" }, { status: "failed", cause: "set-signature-failed" });
            }
            return finishReported({ ...who, api: "yes", sig: "ok", detail: decision.cause }, { status: "inserted", cause: decision.cause });
          });
        }
        return finishReported({ ...who, api: "yes", sig: "skip", detail: "unhandled" }, { status: "skipped", cause: "unhandled-action" });
      }).catch(() => {
        finishReported({ fromClass: "unread", profileClass: "none", api: "yes", sig: "fail", detail: "exception" }, { status: "completed", cause: "exception" });
      });
    });
  }

  // src/runtime/signature-integrity.js
  var BLOCK_TAGS = /* @__PURE__ */ new Set([
    "address",
    "article",
    "blockquote",
    "br",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "li",
    "p",
    "section",
    "table",
    "td",
    "th",
    "tr"
  ]);
  var QUOTE_PATTERNS = [
    /id\s*=\s*["']appendonsend["']/i,
    /id\s*=\s*["']divRplyFwdMsg["']/i,
    /id\s*=\s*["']mail-editor-reference-message-container["']/i,
    /<blockquote\b/i,
    /border-top\s*:\s*solid\s*#(?:E1E1E1|B5C4DF)\b/i,
    /-----Original Message-----/i,
    /<(?:b|strong)>\s*From:\s*<\/(?:b|strong)>[\s\S]{0,900}?<(?:b|strong)>\s*Sent:\s*<\/(?:b|strong)>/i
  ];
  var INVALID_MESSAGE = "The Żugraga Operations signature is missing or was changed. Restore the approved signature directly under your new text and above the quoted message, then send again.";
  var UNVERIFIABLE_MESSAGE = "The Żugraga Operations signature could not be verified. Restore it under your new text and above the quoted message, then send again.";
  function splitCurrentRegion(html) {
    const source = String(html);
    let cut = source.length;
    for (const pattern of QUOTE_PATTERNS) {
      pattern.lastIndex = 0;
      const match = pattern.exec(source);
      if (match && match.index < cut) cut = boundaryIndex(source, match.index);
    }
    if (cut === source.length) return { current: source, quoted: "", foundQuote: false };
    return { current: source.slice(0, cut), quoted: source.slice(cut), foundQuote: true };
  }
  function boundaryIndex(source, index) {
    const tagStart = source.lastIndexOf("<", index);
    const tagEnd = source.lastIndexOf(">", index);
    if (tagStart > tagEnd) return tagStart;
    return index;
  }
  function fingerprint(html) {
    const source = stripHidden(String(html));
    const urls = [];
    let text = "";
    const tagRe = /<!--[\s\S]*?-->|<\/?([a-zA-Z0-9:-]+)([^>]*)>/g;
    let last = 0;
    for (const match of source.matchAll(tagRe)) {
      text += decodeEntities(source.slice(last, match.index));
      last = match.index + match[0].length;
      const raw = match[0];
      if (raw.startsWith("<!--")) continue;
      const tag = (match[1] || "").toLowerCase();
      const closing = /^<\//.test(raw);
      if (!closing && (tag === "a" || tag === "img")) {
        const name = tag === "img" ? "src" : "href";
        const value = attribute(match[2] || "", name);
        if (value) urls.push(normalizeUrl(decodeEntities(value)));
      }
      if (!closing && BLOCK_TAGS.has(tag)) text += "\n";
    }
    text += decodeEntities(source.slice(last));
    return { text: collapse(text), urls: urls.filter(Boolean) };
  }
  function evaluateSignatureHtml(bodyHtml, signatureHtml) {
    if (typeof bodyHtml !== "string" || typeof signatureHtml !== "string" || signatureHtml.length === 0) {
      return deny("unverifiable", UNVERIFIABLE_MESSAGE);
    }
    let current;
    try {
      current = splitCurrentRegion(bodyHtml).current;
    } catch {
      return deny("unverifiable", UNVERIFIABLE_MESSAGE);
    }
    const actual = fingerprint(current);
    const expected = fingerprint(signatureHtml);
    if (!expected.text || expected.urls.length === 0) return deny("unverifiable", UNVERIFIABLE_MESSAGE);
    const textMatches = actual.text.endsWith(expected.text);
    const urlsMatch = expected.urls.every((url) => actual.urls.includes(url));
    if (textMatches && urlsMatch) return { verdict: "valid", allowEvent: true, errorMessage: "" };
    return deny("invalid", INVALID_MESSAGE);
  }
  function deny(verdict, errorMessage) {
    return { verdict, allowEvent: false, errorMessage };
  }
  function stripHidden(html) {
    return html.replace(
      /<([a-zA-Z0-9:-]+)([^>]*\b(?:display\s*:\s*none|mso-hide\s*:\s*all)[^>]*)>[\s\S]*?<\/\1>/gi,
      " "
    );
  }
  function attribute(attrs, name) {
    const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'>]+))`, "i").exec(attrs);
    if (!match) return "";
    return match[1] || match[2] || match[3] || "";
  }
  function decodeEntities(value) {
    return value.replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeCodePoint(parseInt(hex, 16))).replace(/&#(\d+);/g, (_, dec) => safeCodePoint(Number(dec)));
  }
  function safeCodePoint(code) {
    if (!Number.isFinite(code) || code < 0 || code > 1114111) return "";
    return String.fromCodePoint(code);
  }
  function normalizeUrl(raw) {
    const value = String(raw).trim();
    if (/^mailto:/i.test(value)) return `mailto:${value.slice("mailto:".length).trim().toLowerCase()}`;
    if (/^tel:/i.test(value)) return `tel:${value.replace(/[^\d+]/g, "")}`;
    try {
      const url = new URL(value);
      const place = url.searchParams.get("query_place_id");
      if (place) return `maps:${place}`;
      const path = decodeURIComponent(url.pathname).replace(/\/+$/, "");
      return `${url.protocol}//${url.hostname.toLowerCase()}${path}`;
    } catch {
      return value;
    }
  }
  function collapse(value) {
    return value.replace(/[\u200b\u200c\u200d\ufeff]/g, "").replace(/\s+/g, " ").trim().normalize("NFC");
  }

  // src/runtime/send-handler.js
  var UNVERIFIABLE_MESSAGE2 = "The Żugraga Operations signature could not be verified. Restore it under your new text and above the quoted message, then send again.";
  function succeeded(result) {
    return Boolean(result) && (result.status === "succeeded" || result.status === "Succeeded");
  }
  function createGate2(event, deps, onFinish) {
    let settled = false;
    const gate = {
      cancelled: false,
      timer: null,
      finish(decision) {
        if (settled) return false;
        settled = true;
        gate.cancelled = true;
        if (gate.timer != null) {
          try {
            deps.cancel(gate.timer);
          } catch {
          }
        }
        try {
          if (event && typeof event.completed === "function") {
            event.completed(completionPayload(decision));
          }
        } catch {
        }
        onFinish(decision);
        return true;
      }
    };
    gate.timer = deps.schedule(() => {
      gate.finish({ verdict: "unverifiable", allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2, cause: "timeout" });
    }, deps.timeoutMs);
    return gate;
  }
  function completionPayload(decision) {
    if (decision.allowEvent) return { allowEvent: true };
    return { allowEvent: false, errorMessage: decision.errorMessage || UNVERIFIABLE_MESSAGE2 };
  }
  function readSender2(item) {
    if (!item || !item.from || typeof item.from.getAsync !== "function") {
      return Promise.resolve({ known: false, isOperations: false });
    }
    return new Promise((resolve) => {
      try {
        item.from.getAsync((result) => {
          if (!succeeded(result) || !result.value || typeof result.value.emailAddress !== "string") {
            resolve({ known: false, isOperations: false });
            return;
          }
          const email = result.value.emailAddress.trim();
          if (!email) {
            resolve({ known: false, isOperations: false });
            return;
          }
          resolve({ known: true, isOperations: isOperationsSender(email) });
        });
      } catch {
        resolve({ known: false, isOperations: false });
      }
    });
  }
  function readHtmlBody(item) {
    if (!item || !item.body || typeof item.body.getAsync !== "function") {
      return Promise.resolve({ ok: false });
    }
    return new Promise((resolve) => {
      try {
        item.body.getAsync("html", (result) => {
          if (!succeeded(result) || typeof result.value !== "string") {
            resolve({ ok: false });
            return;
          }
          resolve({ ok: true, html: result.value });
        });
      } catch {
        resolve({ ok: false });
      }
    });
  }
  function handleSendEvent(event, deps) {
    return new Promise((resolve) => {
      let gate;
      try {
        gate = createGate2(event, deps, resolve);
      } catch {
        try {
          if (event && typeof event.completed === "function") {
            event.completed({ allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2 });
          }
        } catch {
        }
        resolve({ verdict: "unverifiable", allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2, cause: "exception" });
        return;
      }
      let item;
      try {
        item = deps.getItem();
      } catch {
        gate.finish({ verdict: "unverifiable", allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2, cause: "exception" });
        return;
      }
      readSender2(item).then((sender) => {
        if (gate.cancelled) return;
        if (sender.known && !sender.isOperations) {
          gate.finish({ verdict: "skipped", allowEvent: true, errorMessage: "", cause: "sender-out-of-scope" });
          return;
        }
        if (!sender.known) {
          gate.finish({ verdict: "unverifiable", allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2, cause: "sender-unknown" });
          return;
        }
        const coercion = typeof item.getComposeTypeAsync === "function" ? item.getComposeTypeAsync : null;
        const afterType = (coercionType) => {
          if (gate.cancelled) return;
          if (typeof coercionType === "string" && coercionType.toLowerCase() === "text") {
            gate.finish({ verdict: "unverifiable", allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2, cause: "plain-text" });
            return;
          }
          readHtmlBody(item).then((body) => {
            if (gate.cancelled) return;
            if (!body.ok) {
              gate.finish({ verdict: "unverifiable", allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2, cause: "body-unreadable" });
              return;
            }
            if (typeof deps.signatureHtml !== "string" || deps.signatureHtml.includes("%%")) {
              gate.finish({ verdict: "unverifiable", allowEvent: false, errorMessage: UNVERIFIABLE_MESSAGE2, cause: "signature-invalid" });
              return;
            }
            const decision = evaluateSignatureHtml(body.html, deps.signatureHtml);
            gate.finish({ ...decision, cause: decision.verdict });
          });
        };
        if (!coercion) {
          afterType(void 0);
          return;
        }
        try {
          coercion.call(item, (result) => {
            if (gate.cancelled) return;
            const coercionType = succeeded(result) && result.value ? result.value.coercionType : void 0;
            afterType(coercionType);
          });
        } catch {
          afterType(void 0);
        }
      });
    });
  }

  // src/runtime/launchevent.js
  var TIMEOUT_MS = 4e3;
  var boot = { state: "eval" };
  function runtimeRoot() {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    return null;
  }
  function officeDeps() {
    return {
      getItem() {
        try {
          if (typeof Office === "undefined" || !Office.context || !Office.context.mailbox) return void 0;
          return Office.context.mailbox.item;
        } catch {
          return void 0;
        }
      },
      signatureHtml: signature_default,
      timeoutMs: TIMEOUT_MS,
      senderTimeoutMs: 1500,
      getBoot() {
        return boot.state;
      },
      getMailboxAddress() {
        try {
          if (typeof Office === "undefined" || !Office.context || !Office.context.mailbox || !Office.context.mailbox.userProfile) {
            return "";
          }
          return Office.context.mailbox.userProfile.emailAddress || "";
        } catch {
          return "";
        }
      },
      schedule(fn, ms) {
        return setTimeout(fn, ms);
      },
      cancel(id) {
        clearTimeout(id);
      }
    };
  }
  function onNewMessageComposeHandler(event) {
    handleSignatureEvent(event, officeDeps(), "compose", "new");
  }
  function onMessageFromChangedHandler(event) {
    handleSignatureEvent(event, officeDeps(), "fromChanged", "from");
  }
  function onManualApplyHandler(event) {
    handleSignatureEvent(event, officeDeps(), "compose", "btn");
  }
  function onMessageSendHandler(event) {
    handleSendEvent(event, officeDeps());
  }
  var HANDLERS = {
    onNewMessageComposeHandler,
    onMessageFromChangedHandler,
    onManualApplyHandler,
    onMessageSendHandler
  };
  function associateHandlers() {
    if (typeof Office === "undefined" || !Office.actions || typeof Office.actions.associate !== "function") return;
    for (const name of Object.keys(HANDLERS)) Office.actions.associate(name, HANDLERS[name]);
  }
  function register() {
    const root = runtimeRoot();
    if (root) {
      for (const name of Object.keys(HANDLERS)) root[name] = HANDLERS[name];
    }
    try {
      associateHandlers();
    } catch {
    }
    try {
      if (typeof Office !== "undefined" && typeof Office.onReady === "function") {
        Office.onReady(() => {
          boot.state = "ready";
          try {
            associateHandlers();
          } catch {
          }
        });
      }
    } catch {
    }
  }
  register();
})();
