<script lang="ts">
    import { ThemeSwitcher } from "$lib/scripts/minimal-theme-switcher";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    onMount(() => {
        ThemeSwitcher.init();
    });
</script>

<nav id="navbar" class="container-fluid">
    <ul>
        <li>
            <a href="/">
                <figure id="logo">
                    <svg
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 64 64"
                        style="enable-background:new 0 0 64 64;"
                        xml:space="preserve"
                    >
                        <style type="text/css">
                            .st0 {
                                fill: #253746;
                            }
                            .st1 {
                                fill: #fff;
                            }
                        </style>
                        <g id="logo-type">
                            <circle
                                id="inner-circle"
                                class="st0"
                                cx="32"
                                cy="32"
                                r="32"
                            ></circle>
                            <g id="letter">
                                <path
                                    id="half-circle"
                                    class="st1"
                                    d="M31.9,51.8C20.9,51.7,11.9,42.7,12,31.7s8.9-19.9,19.8-19.8V51.8z"
                                ></path>

                                <ellipse
                                    id="dot"
                                    transform="matrix(1.014651e-02 -0.9999 0.9999 1.014651e-02 21.6404 55.0533)"
                                    class="st1"
                                    cx="38.6"
                                    cy="16.6"
                                    rx="4.6"
                                    ry="4.6"
                                ></ellipse>
                                <rect
                                    id="rect"
                                    x="34"
                                    y="33"
                                    class="st1"
                                    width="12"
                                    height="19"
                                ></rect>
                            </g>
                        </g>
                    </svg>
                </figure>
            </a>
        </li>
    </ul>
    <ul>
        <li>
            <a href="/" aria-current={$page.url.pathname == "/" ? "page" : null}
                >About</a
            >
        </li>
        <li>
            <a
                href="/projects"
                aria-current={$page.url.pathname == "/projects" ? "page" : null}
                >Work</a
            >
        </li>
        <li>
            <details class="dropdown" role="list" dir="rtl">
                <summary aria-haspopup="listbox">Theme</summary>
                <ul role="listbox">
                    <li><a class="selected" href="./" data-theme-switcher="auto">Auto</a></li>
                    <li><a href="./" data-theme-switcher="light">Light</a></li>
                    <li><a href="./" data-theme-switcher="dark">Dark</a></li>
                </ul>
            </details>
        </li>
    </ul>
</nav>

<style>
    #navbar {
        view-transition-name: navbar;
    }
    #logo {
        width: 2.5rem;
    }
</style>
