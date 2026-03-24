export const validateField = (name, value, formData = {}) => {
  let message = "";

  if (name === "name") {
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const trimmed = value.trim();
    if (!trimmed) message = "Name is required";
    else if (trimmed.length < 3) message = "Name must be at least 3 characters";
    else if (trimmed.length > 50) message = "Name too long";
    else if (!nameRegex.test(trimmed)) message = "Name must be alphabet";
  }

  if (name === "email") {
    const val = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    if (!val) message = "Email is required";
    else if (val.length > 50) message = "Email too long";
    else if (!emailRegex.test(val)) message = "Invalid email address";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

  if (name === "password") {
    if (!value) message = "Password is required";
    else if (value.length < 8) message = "Password must be at least 8 characters";
    else if (value.length > 20) message = "Password too long";
    else if (!passwordRegex.test(value)) message = "Must include uppercase, lowercase, number, special character";
  }

  if (name === "confirmPassword") {
    if (!value) message = "Confirm Password is required";
    else if (value.length < 8) message = "Password must be at least 8 characters";
    else if (value.length > 20) message = "Password too long";
    else if (!passwordRegex.test(value)) message = "Must include uppercase, lowercase, number, special character";
    else if (value !== formData.password) message = "Passwords do not match";
  }

  if (name === "currentPassword" || name === "newPassword") {
    if (!value) message = "Password is required";
    else if (value.length < 8) message = "Password must be at least 8 characters";
    else if (value.length > 20) message = "Password too long";
    else if (!passwordRegex.test(value)) message = "Must include uppercase, lowercase, number, special character";
  }

  if (name === "confirmPassword1") {
    if (!value) message = "Confirm Password is required";
    else if (value.length < 8) message = "Password must be at least 8 characters";
    else if (value.length > 20) message = "Password too long";
    else if (!passwordRegex.test(value)) message = "Must include uppercase, lowercase, number, special character";
    else if (value !== formData.newPassword) message = "Passwords do not match";
  }

  if (name === "image") {
    const imageRegex = /\.(jpe?g|png|gif|bmp|webp)$/i;
    if (!value) message = "Image is required";
    else if (!imageRegex.test(value)) message = "Image type should be .png, .jpg, .jpeg";
  }

  if (name === "otp") {
  if (!value) message = "OTP is required";
  else if (!/^\d{6}$/.test(value)) message = "OTP must be 6 digits";
}

// PHONE
if (name === "phone") {
  const digits = value.replace(/\D/g, "");

  if (!digits) message = "Phone number is required";
  else if (!/^\d{12}$/.test(digits)) message = "Phone must be 10 digits";
}

// PINCODE
if (name === "pinCode") {
  if (!value) message = "Pincode is required";
  else if (!/^\d{6}$/.test(value)) message = "Pincode must be 6 digits";
}

// HOUSE
if (name === "house") {
  if (!value.trim()) message = "House / Block is required";
}

// AREA
if (name === "area") {
  if (!value.trim()) message = "Address is required";
}

// LOCALITY
if (name === "locality") {
  if (!value.trim()) message = "Locality is required";
}

// CITY
if (name === "city") {
  if (!value.trim()) message = "City is required";
  else if (!/^[A-Za-z ]+$/.test(value)) message = "City must contain letters only";
}

// STATE
if (name === "state") {
  if (!value.trim()) message = "State is required";
  else if (!/^[A-Za-z ]+$/.test(value)) message = "State must contain letters only";
}

// PRODUCT TITLE
if (name === "title") {
  const trimmed = value.trim();

  if (!trimmed) message = "Product name is required";
  else if (trimmed.length < 3) message = "Product name must be at least 3 characters";
  else if (trimmed.length > 50) message = "Product name too long";
}

// DESCRIPTION
if (name === "description") {
  const trimmed = value.trim();

  if (!trimmed) message = "Description is required";
  else if (trimmed.length < 10) message = "Description too short";
  else if (trimmed.length > 300) message = "Description too long";
}

// PRICE
if (name === "price") {
  if (!value) message = "Price is required";
  else if (!/^\d+$/.test(value)) message = "Price must be a number";
  else if (Number(value) <= 0) message = "Price must be greater than 0";
}

// STOCK
if (name === "stock") {
  if (!value) message = "Stock is required";
  else if (!/^\d+$/.test(value)) message = "Stock must be a number";
  else if (Number(value) < 0) message = "Stock cannot be negative";
}

// CATEGORY
if (name === "category") {
  if (!value) message = "Category is required";
}

if (name === "parentId") {
  if (!value) message = "Main category is required";
}
  return message;
};


export const validateForm = (formData) => {
  const errors = {};
  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key], formData);
    if (error) errors[key] = error;
  });
  return errors;
};


