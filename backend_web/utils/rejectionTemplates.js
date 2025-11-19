// emails/rejectionTemplates.js

exports.rejectionSubject = (hospitalName) =>
  `${hospitalName} - Registration Rejected`;

exports.rejectionText = (hospitalName, reason, appUrl) =>
  `Dear ${hospitalName},\n\nYour hospital registration has been rejected.\nReason: ${reason}\n\nYou can visit ${appUrl} for further details.\n\nRegards,\nAdmin Team`;

exports.rejectionHtml = (hospitalName, reason, appUrl) =>
  `
 <h2 style="color: #e02b46ff;">Registration Rejected</h2>
<p>Dear ${hospitalName},</p>
   <p>Your hospital registration has been <strong>rejected</strong>.</p>
   <p><strong>Reason:</strong> ${reason}</p>
   <p>You can visit <a href="${appUrl}">${appUrl}</a> for further details.</p>
   <p>Regards,<br/><small>© ${new Date().getFullYear()} RedAlert</small></p>`;
