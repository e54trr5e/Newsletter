const newsletterEmail = (
  newsletter,
  unsubscribeUrl
) => {
  return `
    <!DOCTYPE html>

    <html>

      <body
        style="
          margin: 0;
          padding: 0;
          background: #F5F3EE;
          font-family: Arial, sans-serif;
        "
      >

        <div
          style="
            max-width: 650px;
            margin: 30px auto;
            background: white;
            border: 2px solid #0D0D0D;
          "
        >

          <!-- HEADER -->

          <div
            style="
              background: #0D0D0D;
              padding: 25px 30px;
            "
          >

            <h1
              style="
                color: white;
                margin: 0;
                font-size: 30px;
              "
            >
              BYTEPOST
            </h1>

            <p
              style="
                color: #FF5C35;
                margin: 5px 0 0;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 2px;
              "
            >
              READ LESS. KNOW MORE.
            </p>

          </div>


          <!-- CONTENT -->

          <div
            style="
              padding: 35px 30px;
            "
          >

            <p
              style="
                color: #FF5C35;
                font-weight: bold;
                font-size: 13px;
              "
            >
              ISSUE #${newsletter.issueNumber}
            </p>


            <h2
              style="
                font-size: 32px;
                margin: 10px 0 15px;
                color: #0D0D0D;
              "
            >
              ${newsletter.title}
            </h2>


            <p
              style="
                color: #666;
                line-height: 1.7;
                font-size: 16px;
              "
            >
              ${newsletter.description}
            </p>


            <hr
              style="
                margin: 30px 0;
                border: 0;
                border-top: 1px solid #ddd;
              "
            >


            <div
              style="
                line-height: 1.8;
                color: #222;
                font-size: 16px;
                white-space: pre-line;
              "
            >
              ${newsletter.content}
            </div>

          </div>


          <!-- ORANGE FOOTER -->

          <div
            style="
              background: #FF5C35;
              padding: 20px 30px;
            "
          >

            <strong
              style="
                color: #0D0D0D;
              "
            >
              BYTEPOST — READ LESS. KNOW MORE.
            </strong>

          </div>


          <!-- UNSUBSCRIBE -->

          <div
            style="
              background: #F5F3EE;
              padding: 25px 30px;
              text-align: center;
            "
          >

            <p
              style="
                color: #777;
                font-size: 12px;
                margin: 0 0 10px;
              "
            >
              You received this email because
              you subscribed to BYTEPOST.
            </p>


            <a
              href="${unsubscribeUrl}"
              style="
                color: #555;
                font-size: 12px;
                text-decoration: underline;
              "
            >
              Unsubscribe
            </a>

          </div>

        </div>

      </body>

    </html>
  `;
};

export default newsletterEmail; 