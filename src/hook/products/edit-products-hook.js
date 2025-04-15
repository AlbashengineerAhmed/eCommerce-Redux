import React, { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import {
  createProduct,
  getOneProduct,
} from "../../redux/actions/productsAction";
import notify from "./../../hook/useNotifaction";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";
import { updateProducts } from "./../../redux/actions/productsAction";
import baseUrl from "./../../Api/baseURL";
import { useNavigate } from "react-router-dom";

const AdminEditProductsHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const run = async () => {
      try {
        setIsLoading(true);
        await dispatch(getOneProduct(id));
        await dispatch(getAllCategory());
        await dispatch(getAllBrand());
        setError(null);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل البيانات");
        notify("حدث خطأ أثناء تحميل البيانات", "error");
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [dispatch, id]);

  //get one product details
  const item = useSelector((state) => state.allproducts.oneProduct);
  //get last catgeory state from redux
  const category = useSelector((state) => state.allCategory.category);
  //get last brand state from redux
  const brand = useSelector((state) => state.allBrand.brand);

  //get last sub cat state from redux
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const onSelect = (selectedList) => {
    setSeletedSubID(selectedList.map((item) => item._id));
  };

  const onRemove = (selectedList) => {
    setSeletedSubID(selectedList.map((item) => item._id));
  };

  const [options, setOptions] = useState([]);

  //values images products
  const [images, setImages] = useState([]);
  //values state
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
  const [priceAftr, setPriceAftr] = useState("السعر بعد الخصم");
  const [qty, setQty] = useState("الكمية المتاحة");
  const [CatID, setCatID] = useState("0");
  const [BrandID, SetBrandID] = useState("0");
  const [subCatID, setSubCatID] = useState([]);
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item && item.data) {
      try {
        setImages(item.data.images || []);
        setProdName(item.data.title || "");
        setProdDescription(item.data.description || "");
        setPriceBefore(item.data.price || "");
        setPriceAftr(item.data.priceAfterDiscount || "");
        setQty(item.data.quantity || "");
        setCatID(item.data.category || "0");
        SetBrandID(item.data.brand || "0");
        setColors(item.data.availableColors || []);

        // Set subcategories if they exist
        if (item.data.subcategory && item.data.subcategory.length > 0) {
          const validSubcategories = item.data.subcategory
            .filter((sub) => sub && sub._id)
            .map((sub) => sub._id);
          setSeletedSubID(validSubcategories);
        }
      } catch (err) {
        console.error("Error setting product data:", err);
        notify("حدث خطأ أثناء تحميل بيانات المنتج", "error");
      }
    }
  }, [item]);

  useEffect(() => {
    if (subCat && subCat.data) {
      setOptions(
        subCat.data.map((item) => ({
          _id: item._id,
          name: item.name,
        }))
      );
    }
  }, [subCat]);

  //to change name state
  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };
  //to change name state
  const onChangeDesName = (event) => {
    event.persist();
    setProdDescription(event.target.value);
  };
  //to change name state
  const onChangePriceBefor = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };
  //to change name state
  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAftr(event.target.value);
  }; //to change name state
  const onChangeQty = (event) => {
    event.persist();
    setQty(event.target.value);
  };
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };

  //to show hide color picker
  const [showColor, setShowColor] = useState(false);
  //to store all pick color
  const [colors, setColors] = useState([]);
  //when choose new color
  const handelChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  //when selet category store id
  const onSeletCategory = async (e) => {
    setCatID(e.target.value);
  };
  useEffect(() => {
    if (CatID != 0) {
      const run = async () => {
        await dispatch(getOneCategory(CatID));
      };
      run();
    }
  }, [CatID]);

  //when selet brand store id
  const onSeletBrand = (e) => {
    SetBrandID(e.target.value);
  };

  //to convert base 64 to file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  //convert url to file
  const convertURLtoFile = async (url) => {
    const response = await fetch(url, { mode: "cors" });
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], Math.random(), metadata);
  };

  //to save data
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Validate required fields
      if (
        !prodName ||
        !prodDescription ||
        !priceBefore ||
        !qty ||
        !CatID ||
        !BrandID
      ) {
        notify("من فضلك اكمل جميع الحقول المطلوبة", "error");
        return;
      }

      // Create FormData object
      const formData = new FormData();
      formData.append("title", prodName);
      formData.append("description", prodDescription);
      formData.append("price", priceBefore);
      formData.append("priceAfterDiscount", priceAftr);
      formData.append("quantity", qty);
      formData.append("category", CatID);
      formData.append("brand", BrandID);

      // Fix colors handling
      if (colors && colors.length > 0) {
        colors.forEach((color) => {
          formData.append("availableColors[]", color);
        });
      }

      // Add subcategories to formData
      if (seletedSubID && seletedSubID.length > 0) {
        seletedSubID.forEach((subId) => {
          if (subId && typeof subId === "string" && subId.length > 0) {
            formData.append("subcategory[]", subId);
          }
        });
      }

      // Handle images
      if (images && images.length > 0) {
        images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      const response = await dispatch(updateProducts(id, formData));

      if (response && response.status === 200) {
        notify("تم التعديل بنجاح", "success");
        setTimeout(() => {
          navigate("/admin/allproducts");
        }, 1500);
      } else {
        const errorMessage = response?.data?.message || "حدث خطأ أثناء التعديل";
        notify(errorMessage, "error");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      const errorMessage =
        err?.data?.message || err?.message || "حدث خطأ أثناء التعديل";
      notify(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return [
    CatID,
    BrandID,
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handelChangeComplete,
    removeColor,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    isLoading,
    error,
  ];
};

export default AdminEditProductsHook;
