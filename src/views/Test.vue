<template>
   <div>
      <!--      <blog-post :style="{ fontSize: postFontSize + 'em' }"-->
      <!--         v-for="post in posts"-->
      <!--         v-bind:key="Math.random()"-->
      <!--         v-bind:post="post"-->
      <!--         @enlarge-text="postFontSize += 0.1"-->
      <!--      ></blog-post>-->
      <!--      {{reversedMsg}}-->
      <!--      <el-button type="text" @click="open">点击打开 Message Box</el-button>-->

      <!--      <el-button-->
      <!--         type="primary"-->
      <!--         @click="openFullScreen"-->
      <!--         v-loading.fullscreen.lock="fullscreenLoading">-->
      <!--         指令方式-->
      <!--      </el-button>-->
      <el-upload
         class="upload-demo"
         drag
         :show-file-list="false"
         v-loading.fullscreen.lock="fullscreenLoading"
         element-loading-text="拼命加载中"
         :action="url + 'upload?userId=x&fileType=' + fileType"
         :on-progress="openFullScreen"
         :on-success="onSuccess"
         :before-upload="beforeUpload"
         accept=".mp4, .avi, .mov, .wav, .mp3, .aac"
         multiple>
         <i class="el-icon-upload"></i>
         <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
         <div class="el-upload__tip" slot="tip">支持mp3/wav/mp4/aac/avi/mov文件，且不超过5MB</div>
      </el-upload>
      <!--      <div :class="[(randomStuff === 'qwer' || randomStuff === 'asdf') ? 'tooltip-narrow' : 'tooltip-wide' , randomStuff === 'asdf' ? 'two-class-two' : 'two-class-one']">haha</div>-->
      <input class="pt-2" type='file' accept=".mp4, .avi, .mov" @change="convertToAudio"/>
   </div>
</template>

<script>
import BlogPost from "@/components/BlogPost"
import axios from "axios"
import {MessageBox} from 'element-ui'
import VideoToAudio from 'video-to-audio'

const url = 'http://localhost/api/'

export default {
   name: "Test",
   components: {
      BlogPost,
   },
   data() {
      return {
         posts: [],
         randomStuff: 'asdf',
         postFontSize: 1.2,
         url: 'http://localhost/api/',
         fileType: '',
         fullscreenLoading: false,
         result: ''
      }
   },
   methods: {
      async getPosts() {
         // const res = await axios.get('https://swapi.dev/api/people')
         const res = await axios.get(url + 'hello')
         console.log(res.data)
         this.posts = res.data.results
      },
      openFullScreen() {
         this.fullscreenLoading = true
         // setTimeout(() => {
         //    this.fullscreenLoading = false;
         // }, 2000);
      },
      onSuccess(res) {
         this.fullscreenLoading = false
         if (res.flash_result) {
            console.log(res.flash_result[0].text)
            this.result = res.flash_result[0].text
            // open()
            MessageBox.alert(this.result, '识别结果', {
                  confirmButtonText: '确定',
                  // callback: action => {
                  //    this.$message({
                  //       type: 'info',
                  //       message: `action: ${action}`
                  //    });
                  // }
               }
            )
         } else {
            this.$message({
               showClose: true,
               message: '错了哦，这是一条错误消息',
               type: 'error'
            })
         }
      },
      open() {
         MessageBox.alert(this.result, '识别结果', {
            confirmButtonText: '确定',
            callback: action => {
               this.$message({
                  type: 'info',
                  message: `action: ${action}`
               })
            }
         })
      },
      beforeUpload(file) {
         const typeCheck = file.name === '.mp3/.wav/.mp4/.aac/.avi/.mov'
         const sizeCheck = file.size / 1024 / 1024 < 5


         console.log('typeCheck ', file)

         // this.fileType = file.type
         // if (!isJPG) {
         //    if (file.type === 'mp4')
         //       this.$message.error('上传MP4!')
         //
         //    this.$message.error('上传头像图片只能是 JPG 格式!')
         // }
         if (file.name.includes('.mp3') || file.name.includes('.aac') || file.name.includes('.wav'))
            console.log('audio')
         else if (file.name.includes('.mov') || file.name.includes('.avi') || file.name.includes('.mp4'))
            console.log('video')
         else {
            console.log('invalid type')
            return false
         }
         console.log('passed')
         if (!sizeCheck) {
            this.$message.error('上传大小不能超过 5MB!')
         }
         return true
      },

      fileUpload(file) {
         console.log("file upload? ")
         const formData = new FormData()
         formData.append('file', file)
         const config = {
            timeout: 15000,
            headers: {
               'content-type': 'multipart/form-data'
            }
         }
         return axios.post(url + "upload/?userId=x&fileType=wav", formData, config)
      },

      async convertToAudio(event) {
         const format = 'wav'
         let sourceVideoFile = event.target.files[0]
         let convertedAudioDataObj = await VideoToAudio.convert(sourceVideoFile, format)
         this.downloadAudio(convertedAudioDataObj)
         console.log(convertedAudioDataObj)
         let file = await fetch(convertedAudioDataObj.data).then(r => r.blob())
            .then(blobFile => new File([blobFile],
               convertedAudioDataObj.name + Date.now() + '.wav', {type: "audio/wav"}))
         this.fileUpload(file).then((response) => {
            console.log(response.data)
         }).catch((e) => {
            console.log(e)
         })

      },

      downloadAudio(convertedAudioDataObj) {
         let a = document.createElement("a")
         a.href = convertedAudioDataObj.data
         a.download = convertedAudioDataObj.name + "." + convertedAudioDataObj.format
         a.click()
      }
   },

   computed: {
      reversedMsg() {
         return this.posts[0].name.split('').reverse().join('')
      }
   },

   created() {
      this.getPosts()
   }

}
</script>

<style scoped>
.tooltip-wide {
   width: 400px;
   background: blue;
}

.tooltip-narrow {
   width: 250px;
   background: green;
}

.two-class-one {
   border: 3px solid grey
}

.two-class-two {
   border: 5px solid yellow
}
</style>
