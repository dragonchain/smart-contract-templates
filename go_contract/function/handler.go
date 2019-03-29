package function

import (
	"fmt"
	"os"
)

func Handle(req []byte) string {
	fmt.Fprintf(os.Stderr, "This is a log")
	return fmt.Sprintf("Hello from golang smart contract: %s", string(req))
}
