
项目下载完成后在文件根目录依次执行下面命令

```javascript
npm install 

cd ios

pod install

cd ..

react-native run-ios
```




备注：本基础环境建立在一位慕课大佬讲解的项目基础上，通过详细的阅读其源码，重新构建出来的，风格类似，写出来仅仅是为了防止以后遗忘，以及尽可能帮助到一些初学者！不喜勿喷，拜托🙏

可到github上查看源代码：[https://github.com/volonkou/BaseApp](https://github.com/volonkou/BaseApp)

一、项目基础环境构建
1.根据官方文档先init一个项目出来：[中文文档](https://reactnative.cn/docs/getting-started.html)，有任何问题请详细查看文档哈

init命令：（最新版的react native包含CocoaPods，初始化时间有点长，得耐心等待一会）
```javascript
npx react-native init "你的项目名称"
```
二、下载所需要的库，（有些库项目中没引用也需要下载下来，是因为他们有相互依赖关系，请勿删除，详细原因自行查找资料，比如：react-navigation系列的库）
1.下载命令

```javascript
cd "你的项目名称"
```

```javascript
yarn add react-native-event-bus react-native-gesture-handler react-native-reanimated react-native-safe-area-context react-native-screens react-native-splash-screen react-native-vector-icons react-navigation react-navigation-redux-helpers react-navigation-stack react-navigation-tabs react-redux redux redux-thunk @react-native-community/async-storage @react-native-community/masked-view
```

2.React Native最新版的会自动link所使用的库，但是CocoaPods需要install一下，两种方法，pod install会因为网络原因很慢，解决办法很多种，比如科学上网，换源等等，网上一大推，可以去找找看，install 失败很经常，不要灰心，多来几次就好了

```javascript
//在根目录
npx pod-install
//or   在ios文件夹中
cd ios
pod install

```
3.图标库所涉及到的图标引入到手动来操作，这里就不详细写了，请参考我的另一篇博客（用到的就放进去，用不到的就别放了，最好是不要把全部图标文件都放进去，当然放进去也不有太大副作用）
参考：[react native字体图标react-native-vector-icons的使用](https://blog.csdn.net/koufulong/article/details/107140551)

三、项目文件修改与导入
1.文件App.js修改，将以下代码替换原始代码（CMD+A，CMD+C，CMD+V）

```javascript
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {View,Text} from "react-native"
import AppNavigator from './src/navigator/AppNavigators';
import store from './src/store'

export default class App extends Component{
    render() {
        /**
         * 将store传递给App框架
         */
        return <Provider store={store}>
            <AppNavigator/>
        </Provider>
    }
}
```

2.下载主体代码文件（CSDN下载完成直接解压放到根目录就好，github上）
（1）CSDN 下载：[CSDN](https://download.csdn.net/download/koufulong/12628355)
（2）GitHub下载：[GitHub](https://github.com/volonkou/BaseApp)

3.齐活，开始跑一下（记得在根目录运行,很多种运行命令，就不一一列举了，老规矩，想了解，看文档🙃）

```javascript
react-native run-ios
```

4.问题消除
 

 1. 凡是跑不起来的，要检查pod install是否完成  
 2. pod  install成功的还是跑不起来，删除node_modules文件，重新install重新运行

```javascript
rm -rf node_modules 

yarn
```
  

四、项目效果（我的tab，点击Change Color，可以换肤）
![图片](https://img-blog.csdnimg.cn/2020071711073819.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tvdWZ1bG9uZw==,size_16,color_FFFFFF,t_70,#pic_center=375x800)

![图片](https://img-blog.csdnimg.cn/20200717110815407.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tvdWZ1bG9uZw==,size_16,color_FFFFFF,t_70,#pic_center=375x800)
![图片](https://img-blog.csdnimg.cn/2020071711082297.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2tvdWZ1bG9uZw==,size_16,color_FFFFFF,t_70,#pic_center=375x800)