const generateEmailTemplate = (data) => {
  const { fullName, phoneNumber, emailAddress, serviceType, message } = data;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: Arial, Helvetica, sans-serif; 
      line-height: 1.6; 
      color: #2d3748; 
      background-color: #edf2f7; 
      padding: 20px;
    }
    .container { 
      max-width: 650px; 
      margin: 0 auto; 
      background: #ffffff; 
      border-radius: 12px; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      overflow: hidden;
    }
    .header { 
      background: linear-gradient(135deg, #1a202c, #2d3748); 
      color: #ffffff; 
      padding: 24px; 
      text-align: center; 
    }
    .header h2 {
      margin: 0;
      font-size: 22px;
      letter-spacing: 0.5px;
    }
    .content { 
      padding: 28px; 
    }
    .content p {
      margin-bottom: 20px;
      font-size: 15px;
    }
    .field { 
      margin-bottom: 20px; 
    }
    .label { 
      font-weight: bold; 
      color: #4a5568; 
      font-size: 14px; 
      text-transform: uppercase;
      letter-spacing: .5px;
    }
    .value { 
      margin-top: 6px; 
      display: block; 
      font-size: 15px;
      color: #2d3748;
      background: #f7fafc;
      padding: 10px 14px;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    .footer { 
      text-align: center; 
      padding: 18px; 
      background: #f7fafc; 
      font-size: 12px; 
      color: #718096; 
      border-top: 1px solid #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Service Inquiry</h2>
    </div>

    <div class="content">
      <p>You have received a new inquiry from your website contact form. Details are below:</p>
      
      <div class="field">
        <span class="label">Full Name</span>
        <span class="value">${fullName}</span>
      </div>

      <div class="field">
        <span class="label">Phone Number</span>
        <span class="value">${phoneNumber}</span>
      </div>

      <div class="field">
        <span class="label">Email Address</span>
        <span class="value">${emailAddress}</span>
      </div>

      <div class="field">
        <span class="label">Service Type</span>
        <span class="value">${serviceType}</span>
      </div>

      <div class="field">
        <span class="label">Message</span>
        <div class="value" style="white-space: pre-wrap;">${message}</div>
      </div>
    </div>

    <div class="footer">
      This email was sent automatically from your website contact form.
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = { generateEmailTemplate };
