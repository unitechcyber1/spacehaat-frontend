/** Hub-and-spoke diagram for the virtual office city explainer section. */
export function VoCityExplainerDiagram({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-label="Diagram of virtual office services"
    >
      <svg
        viewBox="0 0 400 432"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden
        className="h-full w-full"
      >
        <defs>
          <linearGradient id="voExplainerGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#7AC97D" />
          </linearGradient>
        </defs>

        <g stroke="#4CAF50" strokeWidth="1.5" fill="none" opacity="0.45" strokeDasharray="3 3">
          <line x1="200" y1="200" x2="80" y2="80" />
          <line x1="200" y1="200" x2="320" y2="80" />
          <line x1="200" y1="200" x2="60" y2="200" />
          <line x1="200" y1="200" x2="340" y2="200" />
          <line x1="200" y1="200" x2="200" y2="350" />
        </g>

        {/* Premium address — top left */}
        <g>
          <circle cx="80" cy="80" r="42" fill="#EDF7EE" stroke="#4CAF50" strokeWidth="1.5" />
          <text x="80" y="78" textAnchor="middle" fontSize="22" fontFamily="system-ui, sans-serif">
            🏢
          </text>
          <text
            x="80"
            y="138"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            Premium
          </text>
          <text
            x="80"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            Address
          </text>
        </g>

        {/* Mail handling — top right */}
        <g>
          <circle cx="320" cy="80" r="42" fill="#EDF7EE" stroke="#4CAF50" strokeWidth="1.5" />
          <text x="320" y="78" textAnchor="middle" fontSize="22" fontFamily="system-ui, sans-serif">
            📬
          </text>
          <text
            x="320"
            y="138"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            Mail Handling
          </text>
          <text
            x="320"
            y="150"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            {`& Forwarding`}
          </text>
        </g>

        {/* GST / ROC — left */}
        <g>
          <circle cx="60" cy="200" r="42" fill="#EDF7EE" stroke="#4CAF50" strokeWidth="1.5" />
          <text x="60" y="208" textAnchor="middle" fontSize="22" fontFamily="system-ui, sans-serif">
            📋
          </text>
          <text
            x="60"
            y="258"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            GST / ROC
          </text>
          <text
            x="60"
            y="270"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            Documents
          </text>
        </g>

        {/* Call answering — right */}
        <g>
          <circle cx="340" cy="200" r="42" fill="#EDF7EE" stroke="#4CAF50" strokeWidth="1.5" />
          <text x="340" y="208" textAnchor="middle" fontSize="22" fontFamily="system-ui, sans-serif">
            📞
          </text>
          <text
            x="340"
            y="258"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            Call Answering
          </text>
          <text
            x="340"
            y="270"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            Reception
          </text>
        </g>

        {/* Meeting rooms — bottom */}
        <g>
          <circle cx="200" cy="350" r="42" fill="#EDF7EE" stroke="#4CAF50" strokeWidth="1.5" />
          <text x="200" y="358" textAnchor="middle" fontSize="22" fontFamily="system-ui, sans-serif">
            🤝
          </text>
          <text
            x="200"
            y="408"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            Meeting Rooms
          </text>
          <text
            x="200"
            y="420"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="#1A1A1A"
            fontFamily="system-ui, sans-serif"
          >
            On‑demand
          </text>
        </g>

        {/* Center */}
        <circle cx="200" cy="200" r="58" fill="url(#voExplainerGrad)" />
        <text
          x="200"
          y="196"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#fff"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.04em"
        >
          YOUR
        </text>
        <text
          x="200"
          y="212"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#fff"
          fontFamily="system-ui, sans-serif"
          letterSpacing="0.04em"
        >
          BUSINESS
        </text>
      </svg>
    </div>
  );
}
