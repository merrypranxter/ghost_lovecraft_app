// Non-Euclidean Geometry Vertex Shader
// For R'lyeh and other Great Old One container environments

Shader "LovecraftOS/NonEuclideanGeometry"
{
    Properties
    {
        _Curve("Curvature", Float) = 0 // -1 = Hyperbolic, 0 = Euclidean, 1 = Elliptic
        _GlobalScale("Global Scale", Float) = 0.1
    }

    SubShader
    {
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            struct appdata
            {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                float3 normal : NORMAL;
            };

            float _Curve;
            float _GlobalScale;

            // Port Euclidean coordinates to Non-Euclidean space
            float4 Port(float3 ePoint)
            {
                float3 p = ePoint * _GlobalScale;
                float d = length(p);

                // Avoid division by zero
                if (d < 0.0001f)
                    return float4(p, 1.0f);

                float scale = 4.0f;

                // Hyperbolic space (negative curvature)
                // Objects appear compressed at distance
                if (_Curve < -0.5f)
                {
                    return float4(
                        p / d * sinh(d) / scale,
                        cosh(d) / scale
                    );
                }

                // Elliptic/Spherical space (positive curvature)
                // Objects wrap around, periodic with period π
                if (_Curve > 0.5f)
                {
                    return float4(
                        p / d * sin(d) * scale,
                        -cos(d) * scale
                    );
                }

                // Euclidean fallback
                return float4(p, 1.0f);
            }

            // Modified dot product for curved space lighting
            float DotProduct(float4 u, float4 v)
            {
                float curv = sign(_Curve);
                if (curv < 0.0f) // Hyperbolic
                    return dot(u, v) - 2.0f * u.w * v.w;
                return dot(u, v); // Euclidean/Elliptic
            }

            v2f vert(appdata v)
            {
                v2f o;
                // Transform to non-Euclidean space
                float4 nePos = Port(v.vertex.xyz);
                // Standard MVP transformation after porting
                o.pos = UnityObjectToClipPos(nePos);
                o.normal = v.normal;
                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                // Standard lighting calculation
                return fixed4(1,0,0,1); // Placeholder
            }
            ENDCG
        }
    }
}