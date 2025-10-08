import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import "../resources/theme.css";

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

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
    if (!name) return alert("Nama wajib diisi!");
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
      setProfile((prev) => ({
        ...prev,
        photo: URL.createObjectURL(file),
      }));
    } catch (e) {
      alert("❌ Gagal ganti foto: " + e.message);
    }
  }

  if (loading)
    return <p className="text-center mt-4">Loading profil...</p>;

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <h2>Profil Saya</h2>
      </div>

      <div className="profile-card">
        <img
          src={
            profile?.photo?.startsWith("http")
              ? profile.photo
              : `https://open-api.delcom.org/${profile?.photo}`
          }
          alt="Profile"
        />
        <input type="file" accept="image/*" onChange={handleChangePhoto} />
        <h3>{profile?.name}</h3>
        <p className="text-muted">{profile?.email}</p>

        <hr className="my-3" />
        <h5 className="mb-3">Perbarui Informasi</h5>

        <div className="mb-3 text-start">
          <label className="form-label">Nama Lengkap</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100 mt-2"
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
