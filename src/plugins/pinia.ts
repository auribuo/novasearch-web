import {createPinia, defineStore} from "pinia";

export const pinia = createPinia();

export const useStore = defineStore("settings", () => {
    let _host = "localhost";
    let _port = 8080;
    let _protocol = "http";

    function init() {
        const host = localStorage.getItem("novasearch_host");
        const port = localStorage.getItem("novasearch_port");
        const protocol = localStorage.getItem("novasearch_protocol");

        if (host !== null) {
            _host = host;
        } else {
            _host = "novasearch-api.azurewebsites.net";
        }

        if (port !== null) {
            _port = parseInt(port);
        } else {
            _port = 443;
        }

        if (protocol !== null) {
            _protocol = protocol;
        } else {
            _protocol = "https";
        }
    }

    function host() {
        return _host;
    }

    function port() {
        return _port;
    }

    function protocol() {
        return _protocol;
    }

    function setHost(newHost: string) {
        _host = newHost;
        localStorage.setItem("novasearch_host", newHost);
    }

    function setPort(newPort: number) {
        _port = newPort;
        localStorage.setItem("novasearch_port", newPort.toString());
    }

    function setProtocol(newProtocol: string) {
        _protocol = newProtocol;
        localStorage.setItem("novasearch_protocol", newProtocol);
    }

    function url(path: string): string {
        return `${_protocol}://${_host}:${_port}/api/${path}`;
    }

    return {
        init,
        host,
        port,
        protocol,
        setHost,
        setPort,
        setProtocol,
        url,
    };
});