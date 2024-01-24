import { Controller, Get, Post, Body,UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LoginDto , CreateUserDto  } from './dto';

import { Auth, GetUser, RawHeaders } from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { LoginResponse, ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login( @Body() loginDto: LoginDto){
      return this.authService.login( loginDto );
    }
  
    @Post('register')
    async register( @Body() createUserDto: CreateUserDto){
      return await this.authService.register( createUserDto );
    }
  
    @Get('private')
    @UseGuards( AuthGuard() )
    testingPrivateRoute(
     @Req() request: Express.Request,
      @GetUser() user: User, 
      @GetUser('email') userEmail: string,
      
      @RawHeaders() rawHeaders: string[],
      @Headers() headers: IncomingHttpHeaders, 
    ){
  
      return{
        ok: true,
        message: "Hola mundo Privado",
        user,
        userEmail,
        rawHeaders,
        headers
      }
    }
  
    @Get('private2')
    @RoleProtected( ValidRoles.superUser, ValidRoles.admin )
    @UseGuards( AuthGuard(), UserRoleGuard )
    privateRoute2(
      @GetUser() user: User
    ){
      return{
        ok: true,
        user
      }
    }
    
    @Get('private3')
    @Auth( ValidRoles.admin )
    privateRoute3(
      @GetUser() user: User
    ){
      return{
        ok: true,
        user
      }
    }
    
  
    // @UseGuards( AuthGuard )
    // @Get()
    // findAll( @Request() req: Request ) {
    //   return this.authService.findAll();
    // }
  
    @UseGuards( AuthGuard() )
    @Get('check-token')
    checkToken(  @Req() request: Request ): LoginResponse {
      
      const user = request['user'] as User;
  
      return {
        user,
        token: this.authService.getJwtToken({ email: user.email })
      }
    }
  
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //   return this.authService.findOne(+id);
    // }
  
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    //   return this.authService.update(+id, updateAuthDto);
    // }
  
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.authService.remove(+id);
    // }

}
