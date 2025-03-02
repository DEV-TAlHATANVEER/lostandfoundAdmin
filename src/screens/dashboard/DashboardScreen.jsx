import { Customer, Revenue, Sales, TargetReality, Visitors, TopProducts, SalesMap, VolumeService } from "../../components";
import { fetchPosts } from "../../redux/actions/authActions";
import { DashboardScreenWrap } from "./DashboardScreen.styles";
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
const DashboardScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.auth.posts);
  
  const error = useSelector(state => state.auth.error);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
 console.log( "the post data is ",posts);

 
  return (
    <DashboardScreenWrap className="content-area">
      
      <div className="area-row ar-one">
        <Sales />
        <Visitors />
      </div>
      <div className="area-row ar-two">
        <Revenue />
        <Customer />
        <TargetReality />
        <TopProducts />
        <SalesMap />
        <VolumeService />
      </div>
    </DashboardScreenWrap>
  );
};

export default DashboardScreen;
