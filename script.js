class FormulirRegistrasi {
  constructor() {
    this.namaInput = document.getElementById("nama");
    this.umurInput = document.getElementById("umur");
    this.uangsakuInput = document.getElementById("uangsaku");
    // get id form
    this.form = document.getElementById("registrationForm");
    this.errorText = document.getElementById("errorText");
    // get id table
    this.tableBody = document.getElementById("registrationTableBody");
    this.nomorRegistrasi = 1;
    this.totalUmur = 0;
    this.totalUangsaku = 0;

    this.form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Mencegah pengiriman formulir
      await this.validasiForm();
    });
  }

  async validasiForm() {
    try {
      let nama = this.namaInput.value;
      let umur = parseInt(this.umurInput.value);
      let uangsaku = parseInt(this.uangsakuInput.value);

      if (nama.length < 10) {
        throw new Error("Nama harus minimal 10 karakter.");
      }

      if (umur < 25) {
        throw new Error("Umur harus minimal 25 tahun.");
      }

      if (uangsaku < 100000 || uangsaku > 1000000) {
        throw new Error("Uang saku harus antara 100 ribu hingga 1 juta.");
      }

      this.tambahkanDataKeTabel(this.nomorRegistrasi, nama, umur, uangsaku);
      this.updateRataRata(umur, uangsaku);
      this.resetForm();
      this.showSuccess("Registrasi berhasil!");
      this.nomorRegistrasi++;
    } catch (error) {
      await this.showError(error.message);
    }
  }

  async showError(message) {
    try {
      this.errorText.textContent = message;
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Tunggu 3 detik
      this.errorText.textContent = "";
    } catch (error) {
      console.error("Terjadi kesalahan dalam menampilkan pesan kesalahan:", error);
    }
  }

  showSuccess(message) {
    this.errorText.textContent = "";
    alert(message);
  }

  tambahkanDataKeTabel(nomorRegistrasi, nama, umur, uangsaku) {
    let newRow = this.tableBody.insertRow(this.tableBody.rows.length);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);

    cell1.innerHTML = nomorRegistrasi;
    cell2.innerHTML = nama;
    cell3.innerHTML = umur;
    cell4.innerHTML = uangsaku;
  }

  updateRataRata(umur, uangsaku) {
    this.totalUmur += umur;
    this.totalUangsaku += uangsaku;

    const averageUmur = this.totalUmur / this.nomorRegistrasi;
    const averageUangsaku = this.totalUangsaku / this.nomorRegistrasi;

    document.getElementById("averageUmur").textContent = averageUmur;
    document.getElementById("averageUangsaku").textContent = averageUangsaku;
  }

  resetForm() {
    this.form.reset();
  }
}

// Membuat objek FormulirRegistrasi
const formulirRegistrasi = new FormulirRegistrasi();
