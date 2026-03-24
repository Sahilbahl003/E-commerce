import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import ConfirmModal from "../../components/ui/ConfirmModal";

import {
  getProfileService,
  updateProfileService,
  removeProfileImageService
} from "../../services/profile.service";

import { getToken, getUser } from "../../utils/auth";

const AdminProfile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPreview, setShowPreview] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const [errors, setErrors] = useState({});

  const profilePlaceholder = "https://i.ibb.co/4pDNDk1/avatar.png";

  useEffect(() => {

    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    const storedUser = getUser();

    if (storedUser?.role !== "admin") {
      navigate("/profile");
      return;
    }

    const fetchProfile = async () => {
      try {

        const data = await getProfileService();

        setUser(data.user || null);
        setName(data.user?.name || "");

      } catch {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();

  }, [navigate]);


  const updateProfile = async () => {

    if (errors.image || loading) return;

    setLoading(true);

    const form = new FormData();
    form.append("name", name);

    if (image) form.append("image", image);

    try {

      const data = await updateProfileService(form);

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("Profile updated");

      setUser(data.user || null);
      setImage(null);

      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 trigger navbar update instantly
      window.dispatchEvent(new Event("userUpdated"));

    } catch (error) {

      toast.error(error.message || "Something went wrong");

    }

    setLoading(false);
  };


  const confirmLogout = () => {

    localStorage.clear();

    toast.success("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };


  const confirmRemoveImage = async () => {

    try {

      const data = await removeProfileImageService();

      if (!data.success) {
        toast.error(data.message || "Failed to remove image");
        return;
      }

      setImage(null);
      setUser(data.user);

      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 trigger navbar update instantly
      window.dispatchEvent(new Event("userUpdated"));

      toast.success("Profile image removed");

    } catch (error) {

      toast.error(error.message || "Something went wrong");

    }

    setShowRemoveModal(false);
  };


  const handleImageChange = (file) => {

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!allowedTypes.includes(file.type)) {

      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, JPEG and PNG formats allowed"
      }));

      setImage(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {

      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 2MB"
      }));

      setImage(null);
      return;
    }

    setErrors((prev) => ({
      ...prev,
      image: ""
    }));

    setImage(file);
  };


  return (

    <div className="w-full min-h-screen flex justify-center items-center">

      <div className="bg-white shadow-xl px-8 py-6 w-[420px] rounded-xl flex flex-col gap-5">

        <h2 className="text-2xl font-bold text-center text-zinc-500">
          Admin Profile
        </h2>

        <div className="flex flex-col items-center gap-3">

          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.profileImage || profilePlaceholder
            }
            className="w-24 h-24 rounded-full object-cover shadow-md cursor-pointer hover:scale-105 transition"
            onClick={() => setShowPreview(true)}
          />

          <div className="flex gap-3">

            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm">

              Upload

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) =>
                  handleImageChange(e.target.files[0])
                }
              />

            </label>

            <button
              onClick={() => setShowRemoveModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
            >
              Remove
            </button>

          </div>

          {errors.image && (
            <p className="text-red-600 text-xs">{errors.image}</p>
          )}

        </div>

        <input
          value={name}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
          className="shadow-sm px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />

        <p className="text-gray-600 text-sm">
          <b>Email:</b> {user?.email}
        </p>

        <button
          onClick={updateProfile}
          disabled={loading}
          className={`${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white rounded-md h-10 transition flex justify-center items-center gap-2 cursor-pointer`}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}

          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>

  );
};

export default AdminProfile;