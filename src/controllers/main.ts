import { Controller, Ctx, Get } from "amala";
import { Context } from "koa";

@Controller("/")
export default class MainController {
	@Get("/")
	index(@Ctx() ctx: Context) {
		return "Hello World";
	}
}
