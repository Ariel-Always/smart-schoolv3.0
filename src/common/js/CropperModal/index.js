import React, { Component } from "react";
import PropTypes from "prop-types";
import Cropper from "react-cropper"; // 引入Cropper
import "cropperjs/dist/cropper.css"; // 引入Cropper对应的css
import { Modal } from "../../index.js";
import "./ClassCropperModal.scss";
import {postData} from '../fetch'
const MAX_FILE_SIZE = 2 * 1024 * 1024; //文件最大限制为2MB
export default class ClassCropperModal extends Component {
  static propTypes = {
    // uploadedImageFile: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    Visiable: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      classModalVisible: props.Visiable,
      classModalFile: null,
      title: props.title ? props.title : "上传图片",
      bodyStyle: props.bodyStyle ? props.bodyStyle : {},
      filename:props.filename ? props.filename : '',
    };
  }

  componentWillMount() {
    const fileReader = new FileReader();
    fileReader.onload = e => {
      const dataURL = e.target.result;
      this.setState({ src: dataURL });
    };
    if (this.state.classModalFile !== null) {
      fileReader.readAsDataURL(this.state.classModalFile);
    }

    // console.log(this.props.Visiable)
  }

  handleSubmit = () => {
    if (!this.state.submitting) {
      // let url = `/homepage_images` // 你要上传的url
      // 拿到文件名
      // let filename = this.props.uploadedImageFile.name

      // TODO: 这里可以尝试修改上传图片的尺寸
      this.cropper.getCroppedCanvas().toBlob(blob => {
        // // 创造提交表单数据对象
        const formData = new FormData()
        // 添加要上传的文件
        formData.append('file', blob, this.state.filename+'1.'+blob.type.split('/')[1])
        // console.log(formData)
        console.log(blob.type,blob.type.split('/')[1],this.state.filename+'.'+blob.type.split('/')[1]);

        // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
        // this.setState({submitting: true})
        // 上传图片
        // const resp = await http.post(url, formData)
        // 拿到服务器返回的数据(resp)
        // console.log(resp)
        // 提示上传完毕
        // this.setState({submitting: false})
        fetch(this.props.ImgUrl,{ 
            method :"POST",
            // mode: "cors", 
            // cache: "no-cache",
            // credentials: "omit",
            body: formData,
            // redirect: "follow",
            // headers:{
            //     "Content-Type": "multipart/form-data"
            // } 
        }).then(res=>res.json()
        ).then(json=>{
            if(json.result){
                this.props.onSubmit(blob);
                this.props.onClose();
            }else{
                console.log(json)
            }
            
        })
        //把选中裁切好的的图片传出去
        
        // 关闭弹窗
        
      });
    }
  };
  cancelSubmit = () => {
    this.props.onClose();
    this.setState({
      classModalFile: null
    });
  };

  handleClassFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        this.setState(
          {
            classModalFile: file // 先把上传的文件暂存在state中
          },
          () => {
            const fileReader = new FileReader();
            fileReader.onload = e => {
              const dataURL = e.target.result;
              this.setState({ src: dataURL });
            };

            fileReader.readAsDataURL(this.state.classModalFile);
          }
        );
      } else {
        console.log("文件过大");
      }
    }
    console.log(this.state.classModalFile);
  };

  render() {
    const { classModalVisible, classModalFile } = this.state;

    console.log(this.props.Visiable);

    return (
      <Modal
        ref="handleAdminMadal"
        bodyStyle={{
        //   width: "724px",
          height: "425px",
          padding: 0,
          ...this.state.bodyStyle
        }}
        type="1"
        width='774'
        title={this.state.title}
        visible={this.props.Visiable}
        onOk={this.handleSubmit}
        onCancel={this.cancelSubmit}
      >
        {/* <div className="class-cropper-modal"> */}
        <div className="modal-panel">
          {/* <div className="modal-top">
                            <span className="modal-title">上传图片</span>'
                            <span className="modal-close" onClick={this.cancelSubmit}></span>
                        </div> */}
          <div className="upload-tips">
            <label className="btn choose-pic">
              <span className="inputBox">选择本地图片</span>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={this.handleClassFileChange}
                accept="image/jpg,image/jpeg,image/gif,image/bmp,image/png"
                className="btn choose-pic"
              />
            </label>
            上传要求：请上传png/jpg格式的图片，图片大小不能超过2MB
          </div>
          <div className="cropper-container-container">
            <div
              className={`cropper-container ${
                classModalFile === null ? "default" : ""
              }`}
            >
              {classModalFile !== null ? (
                <Cropper
                  src={this.state.src}
                  className="cropper"
                  ref={cropper => (this.cropper = cropper)}
                  // Cropper.js options
                  viewMode={1}
                  zoomable={true}
                  aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
                  guides={true}
                  preview=".cropper-preview"
                  movable={true}
                  rotatable={false}
                  // zoomOnTouch={true}
                  // cropBoxMovable={true}
                  center={true}
                  highlight={true}
                  modal={false}
                  rotateTo={-90}
                  // scalable={true}
                  // toggleDragModeOnDblclick={true}
                  // moveTo={true}
                  // zoomOnWheel={true}
                  // responsive={true}
                  // background={false}
                />
              ) : (
                ""
              )}
            </div>

            <div className="preview-container default">
              {/* <div className="cropper-preview " ></div> */}
              {/* <div className="cropper-preview" ><div> */}
              {classModalFile !== null ? (
                <div className="cropper-preview"></div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* <div className="button-row">
                            <button className="submit-button" onClick={this.handleSubmit}>点击提交</button>
                            <button className="cancel-button" onClick={this.cancelSubmit}>取消</button>
                        </div> */}
        </div>
        {/* </div>{" "} */}
      </Modal>
    );
  }
}
