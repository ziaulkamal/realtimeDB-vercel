import { admin } from '@/app/lib/firebaseAdmin';

export async function POST(req) {
  try {
    const { credentials } = await req.json();

    // Validasi data kredensial
    if (!credentials || !credentials.account || !credentials.apiKey || !credentials.cseId) {
      return new Response(JSON.stringify({ error: 'Credentials must include account, apiKey, and cseId' }), { status: 400 });
    }

    // Periksa apakah email sudah ada di Firebase
    const ref = admin.database().ref('credentials');
    const snapshot = await ref.orderByChild('account').equalTo(credentials.account).once('value');
    
    if (snapshot.exists()) {
      return new Response(JSON.stringify({ error: 'Credentials with this email already exists' }), { status: 400 });
    }

    // Tambahkan atribut 'hit' ke data kredensial
    const credentialWithHit = {
      ...credentials,
      hit: 0, // Atur nilai default untuk hit
    };

    // Simpan kredensial ke Firebase Realtime Database
    await ref.push(credentialWithHit);

    return new Response(JSON.stringify({ message: 'Credentials saved successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error saving credentials:', error);
    return new Response(JSON.stringify({ error: 'Failed to save credentials' }), { status: 500 });
  }
}
