import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
  try {
    const { idToken } = await request.json();

    cookies.set('session', idToken, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 5 // 5 days
    });

    return json({ success: true });
  } catch (error) {
    return json({ error: error }, { status: 400 });
  }
}

export async function DELETE({ cookies }) {
  cookies.delete('session', { path: '/' });
  return json({ success: true });
}
