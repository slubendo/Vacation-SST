var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
var app = builder.Build();




app.MapGet("/csharp", () => "Welcome to Vacation Pinterest, ");

app.Run();
