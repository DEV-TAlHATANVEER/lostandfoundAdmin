import { useSelector } from "react-redux";

import { BlockTitle } from "../../../styles/global/default";
import { TopProductsWrap } from "./TopProducts.styles";

const TopProducts = () => {
  const COMMON_ITEMS_DATA = useSelector((state) => state.auth.commonItemsData);

  return (
   <></>
  );
};

export default TopProducts;
