declare module 'msedge-tts' {
    export class MsEdgeTTS {
        setMetadata(voice: string, outputFormat: string): Promise<void>;
        toStream(ssml: string): Promise<NodeJS.ReadableStream>;
    }
    export const OUTPUT_FORMAT: {
        WEBM_24KHZ_16BIT_MONO_OPUS: string;
        [key: string]: string;
    };
}
