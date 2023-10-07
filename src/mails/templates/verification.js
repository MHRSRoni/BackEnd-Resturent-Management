const verificationTemplate = (email, otp, role) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        /* Global Styles */
        body {
            font-family: Arial, sans-serif;
            background-color: #f5eee1;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            text-align: center; /* Center-align the content */
        }
        h1 {
            color: #F7C25D;
        }
        h4 {
            text-align : left;
        }
        h5 {
            margin-top: 20px;
        }
        p {
            color: #333;
            margin-top: 20px;
            text-align : left ;
        }
        .otp-box {
            margin-inline : auto;
            width : fit-content;
            border : 1px solid #D47C16;
            color: #000000;
            font-size: 24px;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 30px;
            display: block;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #D47C16;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            transition: background-color 0.3s;
        }
        .btn:hover {
            background-color: #F7C25D;
            
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verification</h1>
        <h4>Hi ${'there'},</h4>
        <p>Your OTP is:</p>
        <div class="otp-box">${otp}</div>
        <a class="btn" href="${process.env.BACKEND_URL}/auth/verify/${role}?email=${email}&otp=${otp}&subject=Verification">Verify Email</a>
        <h5>Thank's for Signing up,</h4>
    </div>
</body>
</html>

`
}

module.exports = { verificationTemplate }