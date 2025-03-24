import { NextRequest, NextResponse } from "next/server";
import sanitizeHtml from 'sanitize-html';

const sanitize = (input: string) => sanitizeHtml(input, {
  allowedTags: [], // No HTML tags allowed — pure text
  allowedAttributes: {}, // No attributes allowed
  disallowedTagsMode: 'discard'
});

export const POST = async (req: NextRequest) => {
  if (req.method !== 'POST') return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  const body = await req.json();
  if (!body) return NextResponse.json({ message: 'Invalid request' }, { status: 400 });

  const sanitizedSubject = sanitize(body.subject);
  const sanitizedEmailBody = sanitize(body.emailBody);
  const sanitizedName = sanitize(body.name);
  const sanitizedEmail = sanitize(body.email);


  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PLUNK_SECRET}`,
      },
      body: JSON.stringify({
        to: process.env.NICK_EMAIL,
        subject: sanitizedSubject,
        body: sanitizedEmailBody,
        subscribed: false,
        name: sanitizedName,
        from: process.env.NICK_EMAIL,
        reply: sanitizedEmail,
        headers: {},
      }),
    };


    fetch('https://api.useplunk.com/v1/send', options)
      .then(response => response.json())
      .then(data => console.log('email send', data))
      .catch(err => console.error(err));

    return NextResponse.json({ message: 'Your wave has started.' }, { status: 200 });

  } catch (error) {
    console.error('Error occurred during the booking:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};