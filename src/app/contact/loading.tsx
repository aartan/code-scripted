export default function ContactLoading() {
    return (
        <div className="mt-12 mb-12">
            <div className="py-12 md:py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="w-64 h-12 bg-gray-200 rounded-md animate-pulse mx-auto mb-4"></div>
                        <div className="w-full max-w-2xl h-5 bg-gray-200 rounded-md animate-pulse mx-auto mb-2"></div>
                        <div className="w-4/5 max-w-2xl h-5 bg-gray-200 rounded-md animate-pulse mx-auto"></div>
                    </div>

                    <div className="rounded-xl overflow-hidden">
                        <div className="p-6 md:p-8 lg:p-10">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div>
                                        <div className="w-12 h-5 bg-gray-200 rounded-md animate-pulse mb-1"></div>
                                        <div className="mt-1">
                                            <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="w-12 h-5 bg-gray-200 rounded-md animate-pulse mb-1"></div>
                                        <div className="mt-1">
                                            <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="w-16 h-5 bg-gray-200 rounded-md animate-pulse mb-1"></div>
                                    <div className="mt-1">
                                        <div className="w-full h-36 bg-gray-200 rounded-md animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="w-full h-12 bg-gray-200 rounded-md animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}