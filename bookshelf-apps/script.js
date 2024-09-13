document.addEventListener('DOMContentLoaded', function () {
    const rakBuku = {
        BELUM_DIBACA: 'rak-belum-dibaca',
        SEDANG_DIBACA: 'rak-sedang-dibaca',
        SELESAI_DIBACA: 'rak-selesai-dibaca'
    };

    const buku = [];
    const PERISTIWA_RENDER = 'render-buku';
    const PERISTIWA_SIMPAN = 'simpan-buku';
    const KUNCI_PENYIMPANAN = 'BOOKSHELF_APPS';

    let bukuEditId = null;
    let bukuHapusId = null;

    function buatId() {
        return +new Date();
    }

    function buatObjekBuku(id, title, author, year, isComplete) {
        return {
            id,
            title,
            author,
            year: parseInt(year),
            isComplete
        };
    }

    function temukanBuku(bukuId) {
        return buku.find(bukuItem => bukuItem.id === bukuId) || null;
    }

    function temukanIndeksBuku(bukuId) {
        return buku.findIndex(bukuItem => bukuItem.id === bukuId);
    }

    function apakahPenyimpananAda() {
        if (typeof (Storage) === undefined) {
            alert('Browser kamu tidak mendukung local storage');
            return false;
        }
        return true;
    }

    function simpanData() {
        if (apakahPenyimpananAda()) {
            const data = JSON.stringify(buku);
            localStorage.setItem(KUNCI_PENYIMPANAN, data);
            document.dispatchEvent(new Event(PERISTIWA_SIMPAN));
        }
    }

    function muatDataDariPenyimpanan() {
        const dataTerserialisasi = localStorage.getItem(KUNCI_PENYIMPANAN);
        let data = JSON.parse(dataTerserialisasi);

        if (data !== null) {
            for (const bukuItem of data) {
                buku.push(bukuItem);
            }
        }

        document.dispatchEvent(new Event(PERISTIWA_RENDER));
    }

    function buatElemenBuku(bukuObject) {
        const { id, title, author, year, isComplete } = bukuObject;

        const teksJudul = document.createElement('h3');
        teksJudul.innerText = title;

        const teksPenulis = document.createElement('p');
        teksPenulis.innerText = 'Penulis: ' + author;

        const teksTahun = document.createElement('p');
        teksTahun.innerText = 'Tahun: ' + year;

        const container = document.createElement('div');
        container.classList.add('buku_item');
        container.append(teksJudul, teksPenulis, teksTahun);
        container.setAttribute('id', `buku-${id}`);

        const wadahAksi = document.createElement('div');
        wadahAksi.classList.add('action');

        const tombolHapus = document.createElement('button');
        tombolHapus.classList.add('red');
        tombolHapus.innerText = 'Hapus';
        tombolHapus.addEventListener('click', function () {
            tampilkanDialogHapus(id);
        });

        const tombolTandaiSelesai = document.createElement('button');
        tombolTandaiSelesai.innerText = isComplete ? 'Tandai Belum Selesai' : 'Tandai Selesai';
        tombolTandaiSelesai.classList.add('green');
        tombolTandaiSelesai.addEventListener('click', function () {
            ubahStatusSelesai(id);
        });

        const tombolEdit = document.createElement('button');
        tombolEdit.classList.add('blue');
        tombolEdit.innerText = 'Edit';
        tombolEdit.addEventListener('click', function () {
            tampilkanDialogEdit(id);
        });

        wadahAksi.append(tombolHapus, tombolTandaiSelesai);

        if (!isComplete) {
            const tombolTandaiSedangDibaca = document.createElement('button');
            tombolTandaiSedangDibaca.innerText = 'Tandai Sedang Dibaca';
            tombolTandaiSedangDibaca.classList.add('yellow');
            tombolTandaiSedangDibaca.addEventListener('click', function () {
                ubahStatusSedangDibaca(id);
            });

            wadahAksi.append(tombolTandaiSedangDibaca);
        }

        wadahAksi.append(tombolEdit);
        container.append(wadahAksi);

        return container;
    }

    function tambahBuku() {
        const judulBuku = document.getElementById('inputJudulBuku').value;
        const penulisBuku = document.getElementById('inputPenulisBuku').value;
        const tahunBuku = document.getElementById('inputTahunBuku').value;
        const selesai = document.getElementById('inputStatusSelesai').checked;

        if (bukuEditId === null) {
            const id = buatId();
            const bukuObjek = buatObjekBuku(id, judulBuku, penulisBuku, tahunBuku, selesai);
            buku.push(bukuObjek);
        } else {
            const bukuTarget = temukanBuku(bukuEditId);
            bukuTarget.title = judulBuku;
            bukuTarget.author = penulisBuku;
            bukuTarget.year = tahunBuku;
            bukuTarget.isComplete = selesai;
            bukuEditId = null;
        }

        document.dispatchEvent(new Event(PERISTIWA_RENDER));
        simpanData();

        document.getElementById('inputJudulBuku').value = '';
        document.getElementById('inputPenulisBuku').value = '';
        document.getElementById('inputTahunBuku').value = '';
        document.getElementById('inputStatusSelesai').checked = false;
    }

    function hapusBuku(bukuId) {
        const indeksBuku = temukanIndeksBuku(bukuId);
        if (indeksBuku === -1) return;
        buku.splice(indeksBuku, 1);

        document.dispatchEvent(new Event(PERISTIWA_RENDER));
        simpanData();
    }

    function ubahStatusSelesai(bukuId) {
        const bukuTarget = temukanBuku(bukuId);
        if (bukuTarget == null) return;
        bukuTarget.isComplete = !bukuTarget.isComplete;

        document.dispatchEvent(new Event(PERISTIWA_RENDER));
        simpanData();
    }

    function ubahStatusSedangDibaca(bukuId) {
        const bukuTarget = temukanBuku(bukuId);
        if (bukuTarget == null) return;
        bukuTarget.sedangDibaca = !bukuTarget.sedangDibaca;

        document.dispatchEvent(new Event(PERISTIWA_RENDER));
        simpanData();
    }

    function tampilkanDialogEdit(bukuId) {
        const bukuTarget = temukanBuku(bukuId);
        if (bukuTarget == null) return;
        
        document.getElementById('editJudulBuku').value = bukuTarget.title;
        document.getElementById('editPenulisBuku').value = bukuTarget.author;
        document.getElementById('editTahunBuku').value = bukuTarget.year;
        
        bukuEditId = bukuId;
        
        const dialog = document.getElementById('dialogEditBuku');
        dialog.style.display = 'block';
    }

    function sembunyikanDialogEdit() {
        const dialog = document.getElementById('dialogEditBuku');
        dialog.style.display = 'none';
    }

    function simpanEditBuku(event) {
        event.preventDefault();
        
        const judulBuku = document.getElementById('editJudulBuku').value;
        const penulisBuku = document.getElementById('editPenulisBuku').value;
        const tahunBuku = document.getElementById('editTahunBuku').value;

        const bukuTarget = temukanBuku(bukuEditId);
        if (bukuTarget == null) return;

        bukuTarget.title = judulBuku;
        bukuTarget.author = penulisBuku;
        bukuTarget.year = tahunBuku;

        bukuEditId = null;

        document.getElementById('editJudulBuku').value = '';
        document.getElementById('editPenulisBuku').value = '';
        document.getElementById('editTahunBuku').value = '';
        
        sembunyikanDialogEdit();
        
        document.dispatchEvent(new Event(PERISTIWA_RENDER));
        simpanData();
    }

    function cariBuku(event) {
        event.preventDefault();
        const judulBuku = document.getElementById('cariJudulBuku').value.toLowerCase();
        const rakBelumDibaca = document.getElementById(rakBuku.BELUM_DIBACA);
        const rakSedangDibaca = document.getElementById(rakBuku.SEDANG_DIBACA);
        const rakSelesaiDibaca = document.getElementById(rakBuku.SELESAI_DIBACA);

        rakBelumDibaca.innerHTML = '';
        rakSedangDibaca.innerHTML = '';
        rakSelesaiDibaca.innerHTML = '';

        for (const bukuItem of buku) {
            const bukuElemen = buatElemenBuku(bukuItem);
            if (bukuItem.title.toLowerCase().includes(judulBuku)) {
                if (bukuItem.isComplete) {
                    rakSelesaiDibaca.append(bukuElemen);
                } else if (bukuItem.sedangDibaca) {
                    rakSedangDibaca.append(bukuElemen);
                } else {
                    rakBelumDibaca.append(bukuElemen);
                }
            }
        }
    }

    function tampilkanDialogHapus(bukuId) {
        bukuHapusId = bukuId;
        const dialog = document.getElementById('dialogHapusBuku');
        dialog.style.display = 'block';
    }

    function sembunyikanDialogHapus() {
        const dialog = document.getElementById('dialogHapusBuku');
        dialog.style.display = 'none';
    }

    document.getElementById('dialogHapusYa').addEventListener('click', function () {
        hapusBuku(bukuHapusId);
        sembunyikanDialogHapus();
    });

    document.getElementById('dialogHapusTidak').addEventListener('click', function () {
        sembunyikanDialogHapus();
    });

    document.getElementById('dialogEditBatal').addEventListener('click', function () {
        sembunyikanDialogEdit();
    });

    document.getElementById('editBuku').addEventListener('submit', simpanEditBuku);

    document.addEventListener(PERISTIWA_RENDER, function () {
        const rakBelumDibaca = document.getElementById(rakBuku.BELUM_DIBACA);
        const rakSedangDibaca = document.getElementById(rakBuku.SEDANG_DIBACA);
        const rakSelesaiDibaca = document.getElementById(rakBuku.SELESAI_DIBACA);

        rakBelumDibaca.innerHTML = '';
        rakSedangDibaca.innerHTML = '';
        rakSelesaiDibaca.innerHTML = '';

        for (const bukuItem of buku) {
            const bukuElemen = buatElemenBuku(bukuItem);
            if (bukuItem.isComplete) {
                rakSelesaiDibaca.append(bukuElemen);
            } else if (bukuItem.sedangDibaca) {
                rakSedangDibaca.append(bukuElemen);
            } else {
                rakBelumDibaca.append(bukuElemen);
            }
        }
    });

    document.addEventListener(PERISTIWA_SIMPAN, function () {
        console.log('Data berhasil disimpan.');
    });

    if (apakahPenyimpananAda()) {
        muatDataDariPenyimpanan();
    }

    const formTambahBuku = document.getElementById('inputBuku');
    formTambahBuku.addEventListener('submit', function (event) {
        event.preventDefault();
        tambahBuku();
    });

    const formCariBuku = document.getElementById('cariBuku');
    formCariBuku.addEventListener('submit', cariBuku);
});
