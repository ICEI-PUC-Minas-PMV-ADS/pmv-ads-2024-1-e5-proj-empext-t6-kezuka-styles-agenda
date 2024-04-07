using Microsoft.EntityFrameworkCore;
using agenda_on_api_netcore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text; // Use o namespace correto do seu ApplicationDbContext

var builder = WebApplication.CreateBuilder(args);

// Adiciona os serviços ao container.
builder.Services.AddControllers();
// Configuração do Swagger, caso esteja usando para documentação da API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//"DefaultConnection"-> "Server=(localdb)\\mssqllocaldb;Database=AgendaOnDB;Trusted_Connection=True;"
//"AzureConnection"-> "Server=tcp:{your_database_server}.database.windows.net,1433;Initial Catalog={your_database};Persist Security Info=False;User ID={your_username};Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.Services.AddAuthentication(options =>
//{

//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

//})

//.AddJwtBearer(options =>
//{
//    options.SaveToken = true;
//    options.RequireHttpsMetadata = false;
//    options.TokenValidationParameters = new TokenValidationParameters()
//    {
//        ValidateIssuer = false,
//        ValidateAudience = false,
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("bHtnQYUp6GtK81Qh1FR37R0mMNVYnF6y"))
//    };

//});

var app = builder.Build();


// Configuração do pipeline de requisições HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
