import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [nama, setNama] = useState('');
    const [nim, setNim] = useState('');
    const [jurusan, setJurusan] = useState('');

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/api/mahasiswa');
            setMahasiswa(response.data);
        }
        fetchData();
    }, []);

    const addMahasiswa = async () => {
        await axios.post('/api/mahasiswa', { nama, nim, jurusan });
        const response = await axios.get('/api/mahasiswa');
        setMahasiswa(response.data);
    };

    return (
        <div>
            <h1>Data Mahasiswa</h1>
            <ul>
                {mahasiswa.map((mhs) => (
                    <li key={mhs.id}>{mhs.nama} - {mhs.nim} - {mhs.jurusan}</li>
                ))}
            </ul>
            <h2>Tambah Mahasiswa</h2>
            <input placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)} />
            <input placeholder="NIM" value={nim} onChange={(e) => setNim(e.target.value)} />
            <input placeholder="Jurusan" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
            <button onClick={addMahasiswa}>Tambah</button>
        </div>
    );
}
