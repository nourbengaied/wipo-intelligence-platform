# Benchbook AI Navigation Feature

## Overview

The Benchbook page now includes an AI-powered navigation system that can identify sections mentioned by users and automatically navigate to those sections in the PDF with visual highlighting.

## Features Implemented

### 1. **PDF Viewer with react-pdf**

- Replaced basic `<iframe>` with `react-pdf` library for programmatic control
- Added page navigation controls (previous/next buttons)
- Displays current page number and total pages
- Responsive PDF rendering

### 2. **Table of Contents System**

- Created `src/data/benchbookToC.ts` with structured ToC data
- Separate ToC for Philippines benchbook and Introduction benchbook
- Each section includes:
  - Title
  - Page number
  - Subsections (if applicable)
  - Keywords for better AI matching

### 3. **AI-Powered Section Identification**

- Integrates with AWS Bedrock Claude for intelligent query processing
- System prompt includes full ToC context
- AI identifies relevant sections based on user queries
- Fallback to keyword matching if AI service is unavailable

### 4. **Visual Navigation & Highlighting**

- Automatically navigates to identified section's page
- Shows visual indicator with pulsing ring animation around PDF
- Displays badge with section name for 5 seconds
- Smooth page transitions

### 5. **Enhanced Chat Interface**

- Welcome message explains navigation capabilities
- AI responses include section navigation markers
- Shows "📍 Navigating to: [Section Name]" when jumping to sections
- Helpful suggestions for what users can ask

## How It Works

### User Flow:

1. User asks: "Tell me about trademark registration"
2. AI processes query with ToC context
3. AI identifies: "Trademarks > Trademark Registration (Page 16)"
4. System navigates to page 16
5. PDF border highlights with pulsing animation
6. Badge shows "Trademark Registration" for 5 seconds
7. AI provides detailed explanation about the section

### Technical Flow:

```
User Query → AI Processing → Section Matching → Page Navigation → Visual Feedback
```

## Files Modified/Created

### New Files:

- `src/data/benchbookToC.ts` - Table of contents data structure
- `src/pages/Benchbook.css` - PDF styling and animations

### Modified Files:

- `src/pages/Benchbook.tsx` - Complete rewrite with PDF viewer and AI navigation
- `package.json` - Added react-pdf and pdfjs-dist dependencies

## Dependencies Added

- `react-pdf: ^10.3.0` - React wrapper for PDF.js
- `pdfjs-dist: ^5.4.530` - PDF rendering engine

## Configuration

### PDF.js Worker

Worker is loaded from CDN:

```typescript
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
```

### Table of Contents

To add new sections, edit `src/data/benchbookToC.ts`:

```typescript
{
  title: "New Section",
  page: 25,
  keywords: ["keyword1", "keyword2"],
  subsections: [...]
}
```

## AI Integration

### System Prompt Structure:

- Includes full ToC with page numbers
- Instructs AI to use special marker format: `[SECTION: Title | PAGE: X]`
- AI provides context-aware explanations
- Suggests related sections when appropriate

### Response Format:

```
[SECTION: Patent Application Process | PAGE: 8]
The patent application process involves...
```

The marker is parsed and removed, then navigation is triggered.

## Visual Indicators

### Highlighted State:

- 4px primary-colored ring around PDF viewer
- Pulsing animation (3 cycles over 2 seconds)
- Badge showing section name
- Auto-clears after 5 seconds

### Navigation Controls:

- Previous/Next page buttons
- Disabled when at first/last page
- Page counter (e.g., "Page 5 of 42")

## Future Enhancements

### Phase 2 Possibilities:

1. **Text Highlighting**: Add precise text highlighting within pages
2. **Search Within PDF**: Full-text search across the document
3. **Bookmarks**: Save favorite sections
4. **Annotations**: User notes on specific pages
5. **Multi-section Navigation**: Jump between related sections
6. **PDF Outline Extraction**: Auto-generate ToC from PDF structure
7. **Zoom Controls**: Adjust PDF view scale

## Testing the Feature

### Example Queries to Try:

- "Show me the trademark registration section"
- "Tell me about patent examination"
- "Where can I find information on copyright duration?"
- "What does the benchbook say about IP enforcement?"
- "Explain TRIPS agreement"

### Expected Behavior:

1. AI identifies the section
2. PDF navigates to correct page
3. Visual highlight appears
4. Section name badge displays
5. AI provides detailed explanation

## Troubleshooting

### PDF Not Loading:

- Verify PDF files exist in `/public/IP_benchbooks/`
- Check browser console for errors
- Ensure PDF.js worker loaded correctly

### Navigation Not Working:

- Check ToC data matches actual PDF page numbers
- Verify AWS Bedrock credentials configured
- Test with fallback keyword matching

### Visual Indicators Not Showing:

- Check that `Benchbook.css` is imported
- Verify tailwind classes are available
- Inspect animation keyframes loaded

## Performance Considerations

- PDF pages loaded on-demand (not all at once)
- Worker runs in separate thread (doesn't block UI)
- AI responses typically under 2 seconds
- Fallback search is near-instant
- CSS animations hardware-accelerated
