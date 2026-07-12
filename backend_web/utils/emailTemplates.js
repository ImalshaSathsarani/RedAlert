function approvalSubject(hospitalName) {
  return `Your Hospital Registration is Approved`;
}

function approvalText(hospitalName, appUrl) {
  return `Hello ${hospitalName},

Your hospital registration has been approved.

You can now login:
${appUrl}/login

Regards,
RedAlert Team
`;
}

function approvalHtml(hospitalName, appUrl) {
  return `
    <div style="font-family: Arial; color: #333;">
      <h2 style="color: #15ae1dff;">Registration Approved</h2>
      <p>Hello <strong>${hospitalName}</strong>,</p>
      <p>Your hospital registration has been <strong>approved</strong>.</p>
      <p>You may now <a href="${appUrl}/login">log in</a> to your dashboard.</p>

      <br/>
      <small>© ${new Date().getFullYear()} RedAlert</small>
    </div>
  `;
}

module.exports = { approvalSubject, approvalText, approvalHtml };
