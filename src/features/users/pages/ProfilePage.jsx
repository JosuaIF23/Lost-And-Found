import { useEffect, useState } from "react";
import userApi from "../api/userApi";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  // ambil profil dari /users/me
  useEffect(() => {
    async function fetchProfile() {
      try {
        const user = await userApi.getProfile();
        setProfile(user);
        setName(user.name);
      } catch (e) {
        console.error("❌ Gagal ambil profil:", e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);


  async function handleUpdateProfile() {
    if (!name) {
      alert("Nama wajib diisi!");
      return;
    }
    setSaving(true);
    try {
      const updatedUser = await userApi.putProfile(name, profile.email);
      setProfile(updatedUser);
      alert("✅ Profil berhasil diperbarui!");
    } catch (e) {
      alert("❌ Gagal update profil: " + e.message);
    } finally {
      setSaving(false);
    }
  }


  async function handleChangePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await userApi.postProfilePhoto(file);
      alert("✅ Foto profil berhasil diganti!");
      // refresh tampilan foto
      setProfile((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
      }));
    } catch (e) {
      alert("❌ Gagal ganti foto: " + e.message);
    }
  }

  if (loading) {
    return <p className="text-center mt-4">Loading profil...</p>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">👤 Profil Saya</h1>

      {/* Bagian atas: foto + nama */}
      <div className="text-center mb-4">
        <img
          src={
            profile?.photo?.startsWith("http")
              ? profile.photo
              : `https://open-api.delcom.org/storage/${profile?.photo}`
          }
          alt="Profile"
          className="rounded-circle border"
          width="140"
          height="140"
        />
        <div className="mt-2">
          <input type="file" accept="image/*" onChange={handleChangePhoto} />
        </div>
        <h3 className="mt-3">{profile?.name}</h3>
      </div>

      {/* Card update data */}
      <div className="card p-3">
        <h5>Update Profil</h5>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={profile?.email || ""}
            disabled
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleUpdateProfile}
          disabled={saving}
        >
          {saving ? "⏳ Menyimpan..." : "💾 Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
