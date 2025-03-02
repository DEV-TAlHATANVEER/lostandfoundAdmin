import 'bootstrap/dist/css/bootstrap.min.css';
import React,{useEffect,useState} from "react";
import { Modal, Button, Table } from 'react-bootstrap';
import postsData from './posts.json';
import moment from 'moment';
const POSTDetail = () => { 
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  
    // Load posts data from the JSON file
    useEffect(() => {
      // Load posts data from the JSON file
      setPosts(postsData.map(post => ({
        ...post,
        remainingDays: calculateRemainingDays(post.date)
      })));
    }, []);

  const calculateRemainingDays = (postDate) => {
    const currentDate = moment();
    const datePosted = moment(postDate);
    return (-1*datePosted.diff(currentDate, 'days'));
  };
  const handleReview = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleResolve = (postId) => {
    // Resolve dispute logic here
    setPosts(posts.map(post => post.id === postId ? { ...post, status: 'Resolved' } : post));
  };

  const handleRemove = (postId) => {
    // Remove post logic here
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <div>
     
    </div>
  );
  };
  
  export default POSTDetail;
  