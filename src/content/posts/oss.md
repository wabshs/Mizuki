---
title: 生图大模型临时链接转永久OSS链接
published: 2026-01-07
description: '避免聊天页面变成滚木'
image: ''
tags: [ "OSS","AI","Spring Boot" ]
category: '技术'
draft: false
lang: ''
---


大模型生成的图片一般都是3h临时链接，会话记录过了三小时就会失效变成空白

步骤:

- 先调模型
- 用Hutool包下载url
- 存到OSS里返回Url替换


```Java
public Flux<String> handleChat(ChatConversation conversation, String userContent) {
        return Flux.create(emitter -> {
            try {
                // 1. 协议头
                emitter.next("{\"conversationId\":\"" + conversation.getPublicId() + "\"}");

                // 2. 调用绘图模型 (阻塞操作)
                ImageResponse response = imageModel.call(new ImagePrompt(userContent));

                if (response.getResult() != null && response.getResult().getOutput() != null) {
                    String imageUrl = response.getResult().getOutput().getUrl();

                    //下载临时文件保存
                    String finalUrlToSave = imageUrl;
                    try {
                        byte[] imageBytes = HttpUtil.downloadBytes(imageUrl);
                        // 2. 智能处理文件名和后缀
                        // 尝试从 URL 获取后缀 (如 .png, .jpg)，如果获取不到默认为 png
                        String suffix = StrUtil.blankToDefault(FileUtil.getSuffix(imageUrl), "png");
                        // 生成唯一文件名，防止冲突
                        String fileName = "ai_" + IdUtil.fastSimpleUUID() + "." + suffix;
                        // 简单推断 Content-Type
                        String contentType = "image/" + ("jpg".equals(suffix) ? "jpeg" : suffix);

                        // 使用 MockMultipartFile 封装
                        MultipartFile multipartFile = new MockMultipartFile(
                                "file",      // 表单字段名，对应 uploadFile 接口的 @RequestParam 名字
                                fileName,    // 文件名
                                contentType, // 文件类型
                                imageBytes   // 文件内容
                        );
                        // 4. 调用你的上传接口
                        // 假设 uploadFile 返回的是上传后的永久 URL
                        // 如果上传成功，更新要保存到数据库的 URL
                        finalUrlToSave = minioService.uploadFile(multipartFile);
                        String markdownContent = "![Generated Image](" + finalUrlToSave + ")";

                        // 3. 推送结果
                        emitter.next(markdownContent);
                        // 4. 保存记录
                        saveAssistantMessage(conversation.getId(), markdownContent);
                    } catch (Exception e) {
                        emitter.error(new BusinessException(ResultCodeEnum.INTERNAL_SERVER_ERROR, "图像保存失败: " + e.getMessage()));
                    }


                } else {
                    emitter.error(new BusinessException(ResultCodeEnum.INTERNAL_SERVER_ERROR, "图像生成为空"));
                }
                emitter.complete();
            } catch (Exception e) {
                emitter.error(new BusinessException(ResultCodeEnum.INTERNAL_SERVER_ERROR, "图像生成失败: " + e.getMessage()));
            }
        });
    }
```