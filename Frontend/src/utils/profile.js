export const setImage = (image) => {
  localStorage.setItem("image", image);
};

export const getImage = () => {
  return localStorage.getItem("image");
};
 

