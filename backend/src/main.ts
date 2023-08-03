import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as process from "process";
import * as requestIp from "request-ip";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const config = new DocumentBuilder()
        .setTitle("Your AI Chat API")
        .setDescription("Your AI CHAT API description")
        .setVersion("1.0")
        .addTag("Authentication")
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api", app, document, {
        customSiteTitle: "Your AI CHAT",
    });

    app.useGlobalPipes(new ValidationPipe());

    app.use(requestIp.mw());

    await app.listen(process.env.PORT || 5000);
}

async function seed() {
//
}

seed();


bootstrap()
    .then(() => {
        console.log("SERVER IS RUNNING ON 5000 PORT");
    })
    .catch((e) => {
        console.warn(e);
    });
