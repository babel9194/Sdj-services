interface EmailLayoutProps {
  previewText: string;
  heading: string;
  bodyHtml: string;
}

/**
 * Minimal table-based HTML layout for maximum email-client compatibility.
 * Inline styles only — no external CSS, no flexbox/grid.
 */
export function emailLayout({ previewText, heading, bodyHtml }: EmailLayoutProps): string {
  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SDJ Services</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0B0B0B;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;">
    <span style="display:none;font-size:1px;color:#0B0B0B;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
      ${previewText}
    </span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0B0B0B;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background-color:#141416;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,0.08);">
                <span style="font-size:16px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;">
                  SDJ <span style="color:#E50914;">Services</span>
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#FFFFFF;font-weight:700;">
                  ${heading}
                </h1>
                <div style="font-size:14px;line-height:1.6;color:rgba(255,255,255,0.75);">
                  ${bodyHtml}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);">
                <p style="margin:0;font-size:12px;color:#8A8A93;">
                  © ${new Date().getFullYear()} SDJ Services. Tous droits réservés.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function emailButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;margin-top:8px;padding:12px 24px;background-color:#E50914;color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;border-radius:999px;">${label}</a>`;
}
