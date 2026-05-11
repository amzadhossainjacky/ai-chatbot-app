<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class AIProxyController extends Controller
{
    /**
     * Proxy POST /api/ai/ask -> http://114.130.69.239:5021/ask
     */
    public function ask(Request $request)
    {
        $client = new Client(['timeout' => 30]);
        $target = 'http://114.130.69.239:5021/ask';

        try {
            $resp = $client->post($target, [
                'json' => $request->all(),
                'headers' => [
                    'Accept' => 'application/json',
                ],
            ]);

            $body = (string) $resp->getBody();
            $status = $resp->getStatusCode();
            $contentType = $resp->getHeaderLine('Content-Type') ?: 'application/json';

            return response($body, $status)->header('Content-Type', $contentType);
        } catch (RequestException $e) {
            if ($e->hasResponse()) {
                $response = $e->getResponse();
                $body = (string) $response->getBody();
                $status = $response->getStatusCode();
                $contentType = $response->getHeaderLine('Content-Type') ?: 'application/json';
                return response($body, $status)->header('Content-Type', $contentType);
            }

            return response()->json(['error' => 'Upstream request failed', 'message' => $e->getMessage()], 502);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Proxy error', 'message' => $e->getMessage()], 500);
        }
    }
}
