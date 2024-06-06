import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
    const connection = await connectToDatabase();
    const { id } = req.query;
    
    if (req.method === 'GET') {
        const [rows] = await connection.execute('SELECT * FROM mahasiswa WHERE id = ?', [id]);
        res.status(200).json(rows[0]);
    } else if (req.method === 'PUT') {
        const { nama, nim, jurusan } = req.body;
        await connection.execute('UPDATE mahasiswa SET nama = ?, nim = ?, jurusan = ? WHERE id = ?', [nama, nim, jurusan, id]);
        res.status(200).json({ message: 'Mahasiswa updated' });
    } else if (req.method === 'DELETE') {
        await connection.execute('DELETE FROM mahasiswa WHERE id = ?', [id]);
        res.status(200).json({ message: 'Mahasiswa deleted' });
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
