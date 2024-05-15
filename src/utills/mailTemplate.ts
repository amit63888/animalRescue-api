export function forgetPasswordMailTemplate(subject:any ) {
    const htmlContent = `
    <html>
    <head>
        <title>${subject.subject}</title>
        <style>
            /* Styles for the header */
            .header {
                background-color: #4CAF50;
                padding: 20px;
                color: white;
                text-align: center;
                font-size: 24px;
                border-bottom: 2px solid #ffffff;
            }
            .header img {
                width: 100px;
                height: auto;
            }
            /* Styles for the main content */
            .content {
                padding: 20px;
                font-size: 18px;
                background-color: black;
                color:orange;
                border-radius: 5px;
            }
        </style>
        <!-- Bootstrap CSS -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <!-- Header -->
        <div class="header">
            <img src="https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/09/despicable-me-vector.jpg" alt="Logo">
            <h1>${subject.subject}</h1>
        </div>
        
        <!-- Main content -->
        <div class="container content">
            <p>${subject.text}</p>
            ${subject.hyperText}
        </div>
    </body>
    </html>
`;
return  htmlContent;
}
