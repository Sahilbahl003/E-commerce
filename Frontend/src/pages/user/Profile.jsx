import { useEffect, useState, useContext } from "react";
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
import { UserContext } from "../../context/UserContext"; // added

const Profile = () => {

  const navigate = useNavigate();

  const { setUser: updateContextUser } = useContext(UserContext); // added

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

    if (storedUser?.role === "admin") {
      navigate("/admin/profile");
      return;
    }

    fetchProfile();
  }, [navigate]);

  const fetchProfile = async () => {
    try {
      const data = await getProfileService();
      console.log(data);

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      setUser(data.user || null);
      setName(data.user?.name || "");

    } catch {
      toast.error("Failed to load profile");
    }
  };

  const updateProfile = async () => {

    if (errors.image || loading) return;

    setLoading(true);

    const form = new FormData();
    form.append("name", name);

    if (image) {
      form.append("image", image);
    }

    try {

      const data = await updateProfileService(form);

      if (!data.success) {
        toast.error(data.message);
        setLoading(false);
        return;
      }

      toast.success("Profile updated");

      setUser(data.user || null);
      updateContextUser(data.user); //  update Navbar instantly
      localStorage.setItem("user", JSON.stringify(data.user)); // keep persistence

      setImage(null);

    } catch {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const confirmLogout = () => {

    localStorage.clear();

    toast.success("Logged out successfully");
    //window.dispatchEvent(new Event("authChange"));

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

      setUser(data.user || null);
      updateContextUser(data.user); // update Navbar
      localStorage.setItem("user", JSON.stringify(data.user));

      setImage(null);

      toast.success("Profile image removed");

    } catch {
      toast.error("Something went wrong");
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

    <div className="w-full flex justify-center py-20">

      <div className="bg-white shadow-xl px-8 py-6 w-[420px] rounded-xl flex flex-col gap-5">

        <h2 className="text-2xl font-bold text-center text-zinc-500">
          My Profile
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

            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition text-sm">

              Upload

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => handleImageChange(e.target.files[0])}
              />

            </label>

            <button
              type="button"
              onClick={() => setShowRemoveModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition text-sm cursor-pointer"
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
          onChange={(e) => setName(e.target.value)}
          maxLength={20}
          className="shadow-sm px-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={updateProfile}
          disabled={loading}
          className={`${loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
            } text-white rounded-md h-10 transition flex justify-center items-center gap-2 cursor-pointer`}
        >

          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}

          {loading ? "Saving..." : "Save Changes"}

        </button>

        <button
          onClick={() => navigate("/change-password")}
          className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md h-10 transition cursor-pointer"
        >
          Change Password
        </button>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-md h-10 transition cursor-pointer"
        >
          Logout
        </button>

      </div>

      {showPreview && (

        <div
          className="fixed inset-0 bg-zinc-500 bg-opacity-70 flex justify-center items-center z-50 cursor-pointer"
          onClick={() => setShowPreview(false)}
        >

          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.profileImage || profilePlaceholder
            }
            className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain"
          />

          <div className="absolute top-5 right-5 text-white">
            <RxCross1 className="w-6 h-6" />
          </div>

        </div>

      )}

      {showLogoutModal && (
        <ConfirmModal
          title="Logout Confirmation"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
        />
      )}

      {showRemoveModal && (
        <ConfirmModal
          title="Remove Profile Image"
          message="Are you sure you want to remove your profile image?"
          confirmText="Remove"
          onCancel={() => setShowRemoveModal(false)}
          onConfirm={confirmRemoveImage}
        />
      )}

    </div>
  );
};

export default Profile;