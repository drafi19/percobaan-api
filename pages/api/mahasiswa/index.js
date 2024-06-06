import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
    const connection = await connectToDatabase();
    
    if (req.method === 'GET') {
        const [rows] = await connection.execute('SELECT * FROM mahasiswa');
        res.status(200).json(rows);
    } else if (req.method === 'POST') {
        const { nama, nim, jurusan } = req.body;
        await connection.execute('INSERT INTO mahasiswa (nama, nim, jurusan) VALUES (?, ?, ?)', [nama, nim, jurusan]);
        res.status(201).json({ message: 'Mahasiswa added' });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
