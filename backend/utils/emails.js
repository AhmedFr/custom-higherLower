const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendForgotPasswordEmail(userEmail, token) {
  const { data, error } = await resend.emails.send({
    from: "HigherOrLower <ahmed-higherOrLower@resend.dev>",
    to: [userEmail],
    subject: "Forgot password",
    html: `<strong>It seems you have forgotten your password please follow this link to set a new one.<br/>This link will expire use as soon as you receive this email.</strong>
    <a href="${process.env.FRONT_URL}/auth/new-password/${token}">Click here to reset your password</a>`,
  });

  if (error) {
    console.error(error);
    return { success: false, error: error };
  }
  return { success: true, data: data };
}

module.exports = {
  sendForgotPasswordEmail,
};
