import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "julian.pacilio@davinci.edu.ar",
    pass: "vjmfcemhqheihmxw",
  },
});

/**
 * Envía el código de recuperación de contraseña por email.
 * @param {string} email - Email destino.
 * @param {string} code - Código de 6 dígitos.
 */
export async function sendPasswordResetCode(email, code) {
  const resetUrl = `http://192.168.1.2:3000/reset-password?email=${encodeURIComponent(email)}&code=${code}`;

  await transporter.sendMail({
    from: `"Goto Game Jam" <julian.pacilio@davinci.edu.ar>`,
    to: email,
    subject: "Restablecé tu contraseña",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Restablecer contraseña</h2>
        <p>Hacé click en el siguiente botón para restablecer tu contraseña. El link expira en 10 minutos.</p>
        <p style="text-align: center; margin: 24px 0;">
          <a href="${resetUrl}" style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
            Restablecer contraseña
          </a>
        </p>
        <p style="color: #888; font-size: 13px;">
          Si el botón no funciona, copiá y pegá este link en tu navegador:<br>
          ${resetUrl}
        </p>
        <p>Si no solicitaste esto, podés ignorar este mensaje.</p>
      </div>
    `,
  });
}