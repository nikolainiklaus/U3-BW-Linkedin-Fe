import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAllPosts, updatePost, updatePostImage } from "../redux/actions";
import { RiGalleryFill, RiMoreFill } from "react-icons/ri";
import { FaVideo } from "react-icons/fa";
import { FaDochub } from "react-icons/fa";
import Loader from "./Loader";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

const EditPostModal = ({ handleClose, show, postId, postText }) => {
  const [content, setContent] = useState({
    text: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // const [text, setText] = useState("");
  const dispatch = useDispatch();
  const updatePostHandler = async () => {
    setLoading(true);
    console.log("Loading started");
    try {
      if (content.image) {
        const formData = new FormData();
        formData.append("post", content.image);
        await dispatch(updatePostImage(postId, formData, handleClose));
      }
      await dispatch(updatePost(postId, { text: content.text }));
      await dispatch(getAllPosts());
    } catch (error) {
      console.error("Error updating the post: ", error);
    } finally {
      setLoading(false);
      console.log("Loading ended");
      toast.success("Your Post has been edited successfully!");
    }
  };

  useEffect(() => {
    setContent(postText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit post</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading && <Loader />}
        <input
          type="file"
          onChange={(e) => {
            // console.log(e.target.files[0]);
            setContent({ ...content, image: e.target.files[0] });
          }}
        />
        <textarea
          className="start-post-modal-textarea"
          placeholder="What do you want to talk about?"
          value={content.text}
          onChange={(e) => {
            setContent({ ...content, text: e.target.value });
          }}
        ></textarea>
      </Modal.Body>
      <Modal.Footer className="justify-content-start ">
        <Row className="w-100 align-items-center">
          <Col md={8} className="px-0 ">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center ">
                <div className="icon-hover d-flex align-items-center jusrify-content-center ">
                  {" "}
                  <RiGalleryFill
                    size={20}
                    fill="rgba(0,0,0,0.6)"
                    className="w-100"
                  />
                </div>
                <div className="icon-hover d-flex align-items-center jusrify-content-center ">
                  {" "}
                  <FaVideo size={20} fill="rgba(0,0,0,0.6)" className="w-100" />
                </div>
                <div className="icon-hover d-flex align-items-center jusrify-content-center ">
                  {" "}
                  <FaDochub
                    size={20}
                    fill="rgba(0,0,0,0.6)"
                    className="w-100"
                  />
                </div>
                <div className="icon-hover d-flex align-items-center jusrify-content-center ">
                  {" "}
                  <RiMoreFill
                    size={20}
                    fill="rgba(0,0,0,0.6)"
                    className="w-100"
                  />
                </div>
              </div>
              <div className="modal-footer-breakline"></div>
              <div className="start-post-modal-anyone-btn ml-2">
                <i className="bi bi-chat-right-text"></i>
                <span>Anyone</span>
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className="d-flex align-items-center justify-content-end">
              <i className="bi bi-clock"></i>
              <Button
                // variant={text.length === 0 ? "secondary" : "primary"}
                // disabled={text.length === 0}
                onClick={() => {
                  handleClose();
                  updatePostHandler();
                }}
                className="ml-2"
              >
                Update
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPostModal;
