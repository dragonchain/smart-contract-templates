using System;
using System.IO;
using System.Text;

namespace Function
{
    public class FunctionHandler
    {
        public string Handle(string input) {
            TextWriter errorWriter = Console.Error;
            errorWriter.WriteLine("This is a log");
            return $"Hello from csharp smart contract: {input}\n";
        }
    }
}
