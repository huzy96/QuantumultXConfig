package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"sort"
	"strings"
)

func main() {
	generateAdBlockConf()
}

func generateAdBlockConf() {
	resp, err := http.Get("https://raw.githubusercontent.com/Cats-Team/AdRules/main/qx.conf")
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	outString := ""

	hostSortKeyList := []string{}
	resultMap := map[string]unit{}
	for _, line := range strings.Split(string(body), "\n") {
		if strings.HasPrefix(line, "host") {
			temp := strings.Split(line, ",")
			if len(temp) != 3 {
				fmt.Println(temp)
				continue
			}
			kind := temp[0]
			host := temp[1]
			operation := temp[2]
			hostPart := strings.Split(host, ".")
			hostSortKey := ""
			for i := len(hostPart) - 1; i >= 0; i-- {
				hostSortKey += hostPart[i] + "."
			}
			hostSortKeyList = append(hostSortKeyList, hostSortKey)
			resultMap[hostSortKey] = unit{
				kind:      kind,
				host:      host,
				operation: operation,
			}
		} else {
			outString += line + "\n"
		}
	}

	sort.Strings(hostSortKeyList)

	for _, hostSortKey := range hostSortKeyList {
		// outString += fmt.Sprintf("%v,%v,%v\n", resultMap[hostSortKey].kind, resultMap[hostSortKey].host, resultMap[hostSortKey].operation)
		outString += resultMap[hostSortKey].kind + ", " + resultMap[hostSortKey].host + ", " + resultMap[hostSortKey].operation + "\n"
	}

	err = os.WriteFile("./Profiles/filter/adBlock.conf", []byte(outString), 0644)
	if err != nil {
		panic(err)
	}

}

type unit struct {
	kind      string
	host      string
	operation string
}
