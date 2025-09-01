interface ExampleProps {
    firstName?: string;
    lastName: string;
    email: string;
    message?: string;
}

export const getExampleEmail = (props: ExampleProps) => {
    const { firstName, lastName, email, message } = props;

    const subject = `EXAMPLE: ${firstName} ${lastName}`;

    const html = `
    <h1>Example</h1>
    <p>You have a new example.</p>
    <h2>Details:</h2>
    <ul>
      <li><strong>First Name:</strong> ${firstName || 'N/A'}</li>
      <li><strong>Last Name:</strong> ${lastName}</li>
      <li><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></li>
      <li><strong>Message:</strong> <span style="white-space: pre-wrap; max-width: 600px;">${
          message || 'N/A'
      }</span></li>
    </ul>
  `;

    return { subject, html };
};
