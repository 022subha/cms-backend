import { IActivationMailBody } from "../types/auth.types";

export const activationMail = (data: IActivationMailBody) => {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <title>Ediary Activation Email</title>
    <style>
            body {
                    margin: 0;
                    padding: 0;
                    min-width: 100%;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    background-color: #fafafa;
                    color: #222222;
                    text-align: justify;
            }
            .email-wrapper {
                    max-width: 600px;
                    margin: 0 auto;
            }
            .email-header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    background-color: #4066ff;
                    padding: 24px;
                    color: #ffffff;
            }
            .email-header img {
                    max-width: 100px;
                    margin-bottom: 20px;
            }
            .email-header p {
                    font-size: 36px;
                    font-weight: 600;
                    margin: 10px 0;
            }
            .email-body {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    padding: 24px;
                    background-color: #ffffff;
            }
            .email-body p {
                    margin-top: 0;
                    margin-bottom: 24px;
            }
            .otp {
                    display: inline-block;
                    align-self: center;
                    padding: 10px 25px;
                    margin: 0 auto;
                    margin-bottom: 24px;
                    font-weight: 700;
                    color: #ffffff;
                    background-color: #4066ff;
                    border-radius: 10px;
            }
            .email-footer {
                    padding: 24px;
                    background-color: #ded9d9;
            }
            .email-footer p {
                    margin-top: 0;
                    margin-bottom: 24px;
            }
    </style>
</head>
<body>
    <div class="email-wrapper">
            <div class="email-header">
                    <img src="https://theediary.vercel.app/assets/images/logo.png" alt="Ediary Logo" />
                    <p>Ediary</p>
            </div>
            <div class="email-body">
                    <p>Hello ${data.name},</p>
                    <p>Thank you for registering with Ediary. To complete your registration, please use the following OTP (One-Time Password) to verify your account:</p>
                    <h2 class="otp">${data.otp}</h2>
                    <p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email. Once your account is verified, you will have access to our platform and its features.</p>
            </div>
            <div class="email-footer">
                    <p>If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:support@ediary.com">support@ediary.com</a>. We are here to help!</p>
            </div>
    </div>
</body>
</html>`;
};
