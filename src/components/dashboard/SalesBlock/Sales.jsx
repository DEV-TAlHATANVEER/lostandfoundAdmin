import { useSelector } from "react-redux";
import { Icons } from "../../../assets/icons";
import { BlockContentWrap, BlockTitle } from "../../../styles/global/default";
import { SalesBlockWrap } from "./Sales.styles";

const SalesBlock = () => {
  const allPosts = useSelector((state) => state.auth.posts);

  // Calculate the dynamic values
  const itemsFound = allPosts.filter((post) => post.type === "Found").length;
  const itemsLost = allPosts.filter((post) => post.type === "Lost").length;
  const itemsClaimed = allPosts.filter((post) => post.claimedBy.length > 0).length;
  const newReports = allPosts.length;

  return (
    <SalesBlockWrap>
      <div className="block-head">
        <div className="block-head-l">
          <BlockTitle className="block-title">
            <h3>Today's Summary</h3>
          </BlockTitle>
          <p className="text">Lost and Found Summary</p>
        </div>
       
      </div>
      <BlockContentWrap>
        <div className="cards">
          <div className="card-item card-misty-rose">
            <div className="card-item-icon">
              <img src={Icons.CardSales} alt="Items Found Icon" />
            </div>
            <div className="card-item-value">{itemsFound}</div>
            <p className="card-item-text text">Items Found</p>
            
          </div>
          <div className="card-item card-latte">
            <div className="card-item-icon">
              <img src={Icons.CardOrder} alt="Items Claimed Icon" />
            </div>
            <div className="card-item-value">{itemsClaimed}</div>
            <p className="card-item-text text">Items Claimed</p>
           
          </div>
          <div className="card-item card-nyanza">
            <div className="card-item-icon">
              <img src={Icons.CardProduct} alt="Items Lost Icon" />
            </div>
            <div className="card-item-value">{itemsLost}</div>
            <p className="card-item-text text">Items Lost</p>
            
          </div>
          <div className="card-item card-pale-purple">
            <div className="card-item-icon">
              <img src={Icons.CardCustomer} alt="New Reports Icon" />
            </div>
            <div className="card-item-value">{newReports}</div>
            <p className="card-item-text text">New Reports</p>
          </div>
        </div>
      </BlockContentWrap>
    </SalesBlockWrap>
  );
};

export default SalesBlock;
